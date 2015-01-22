'use strict';

var should = require('should');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var testConfig = require('./lib/testConfig');

var smtpeshka = require(path.join(__dirname, '../smtpeshka.js'));
;

describe('SMTPeshka Servers', function(){

    var config;
    var email = {
        from: 'from@smtpeshka.com',
        to: 'to@smtpeshka.com',
        subject: 'hello',
        text: 'hello World!'
    };
    var messageId;

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
            // var file=path.

            done();
        });
    });

    describe('SMTPeshka REST API functions', function(){

        it('should request e-mail list', function(done){
            done();
        });
    });
});
