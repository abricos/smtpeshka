'use strict';

var should = require('should');
var fs = require('fs');

var Config = require('../lib/Config');

var SMTPESHKA = 'smtpeshka';

describe('SMTPeshka', function(){

    describe('Config', function(){

        var config

        it('get instance', function(done){
            config = Config.instance(SMTPESHKA);

            should.exist(config);
            done();
        });

        it('option `directory`', function(done){
            var directory = config.get('directory');

            should(directory).be.type('string');

            done();
        });

        it('option `smtpeshka.haraka.prog.dir` (dir exist)', function(done){
            var option = config.get('smtpeshka.haraka.prog.dir');

            should(option).be.type('string');

            var exist = fs.existsSync(option);
            exist.should.be.ok;

            done();
        });

        it('option `smtpeshka.haraka.config.source.dir` (dir exist)', function(done){
            var option = config.get('smtpeshka.haraka.config.source.dir');

            should(option).be.type('string');

            var exist = fs.existsSync(option);
            exist.should.be.ok;

            done();
        });

    });
});
