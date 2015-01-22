'use strict';

var should = require('should');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var testConfig = require('./lib/testConfig');

var smtpeshka = require(path.join(__dirname, '../smtpeshka.js'));

describe('SMTPeshka Servers', function(){

    var config;
    var email = {
        from: 'from@smtpeshka.com',
        to: 'to@smtpeshka.com',
        subject: 'Hello my friend',
        text: 'This is a very important message for you!'
    };
    var messageId;
    var fileSavedEMail;

    before(function(done){
        config = testConfig();
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
            var port = config.get('smtpeshka.SMTP.port');

            var transporter = nodemailer.createTransport(smtpTransport({
                port: port,
                host: 'localhost'
            }));

            transporter.sendMail(email, function(err, info){
                should.not.exist(err);
                should.exist(info);

                info.should.have.property('messageId');

                messageId = info.messageId;
                done();
            });
        });

        it('should be e-mail saved in a JSON file', function(done){

            var sentDir = config.get('smtpeshka.transport.json.saveto');
            var file = path.join(sentDir, messageId + '.json');
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
            should.equal(messageId, fileSavedEMail.messageId);
            should.equal(email.subject, fileSavedEMail.subject);

            done();
        });
    });

    describe('SMTPeshka REST API functions', function(){

        it('should request e-mail list', function(done){

            console.log(fileSavedEMail);
            console.log(email);

            done();
        });
    });
});
