'use strict';

var should = require('should');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var request = require('request');
var md5 = require('md5');

var testConfig = require('./lib/testConfig');

var smtpeshka = require(path.join(__dirname, '../smtpeshka.js'));

describe('SMTPeshka Servers', function(){

    var config;
    var email = {
        from: 'from@smtpeshka.local',
        to: 'to@smtpeshka.local',
        subject: 'Hello my friend',
        text: 'This is a very important message for you!'
    };
    var messageIdHash;
    var fileSavedEMail;

    before(function(done){
        config = testConfig.clean();
        smtpeshka.start(function(){
            done();
        });
    });

    after(function(done){
        smtpeshka.stop();
        testConfig.clean();
        done();
    });

    describe('SMTP-server by Haraka', function(){

        it('should be sended e-mail', function(done){
            var port = config.get('SMTP.port');

            var transporter = nodemailer.createTransport(smtpTransport({
                port: port,
                host: 'localhost'
            }));

            transporter.sendMail(email, function(err, info){
                should.not.exist(err);
                should.exist(info);

                info.should.have.property('messageId');

                messageIdHash = md5(info.messageId);
                done();
            });
        });

        it('should be e-mail saved in a JSON file', function(done){

            var sentDir = config.get('transport.json.saveto');
            var file = path.join(sentDir, messageIdHash + '.json');
            var fExist = fs.existsSync(file);

            fExist.should.be.true;

            fse.readJsonFile(file, function(err, json){
                should.not.exist(err);
                should.exist(json);

                fileSavedEMail = json;

                done();
            });
        });

        it('should be coincident values between sent and JSON emails', function(done){
            should.equal(messageIdHash, fileSavedEMail.messageIdHash);
            should.equal(email.subject, fileSavedEMail.subject);

            done();
        });
    });

    describe('SMTPeshka REST API functions', function(){

        it('should request e-mail list (http://localhost:8025/api)', function(done){

            var port = config.get('web.port');
            var host = 'localhost';
            var uri = 'http://' + host + ':' + port + '/api';

            request(uri, function(err, response, body){
                should.not.exist(err);
                should.exist(response);

                should.equal(response.statusCode, 200);

                var json = JSON.parse(body);

                should.exist(json);
                json.should.be.an.Array;

                done();
            });
        });

        it('should request e-mail by messageIdHash (http://localhost:8025/api/email/:messageIdHash)', function(done){

            var port = config.get('web.port');
            var host = 'localhost';
            var uri = 'http://' + host + ':' + port + '/api/email/' + messageIdHash;

            request(uri, function(err, response, body){

                should.not.exist(err);
                should.exist(response);
                should.exist(body);

                should.equal(response.statusCode, 200);

                var json = JSON.parse(body);
                should.exist(json);

                should.equal(json.messageIdHash, messageIdHash);

                done();
            });
        });

        it('should request status (http://localhost:8025/api/status)', function(done){

            var port = config.get('web.port');
            var host = 'localhost';
            var uri = 'http://' + host + ':' + port + '/api/status';

            request(uri, function(err, response, body){
                should.not.exist(err);
                should.exist(response);

                should.equal(response.statusCode, 200);

                var json = JSON.parse(body);
                should.exist(json);

                should.equal(json.web.port, port);

                done();
            });
        });

    });
});
