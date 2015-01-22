'use strict';

var should = require('should');
var fs = require('fs');

var testConfig = require('./lib/testConfig');

describe('SMTPeshka Config', function(){

    var config

    it('get instance', function(done){
        config = testConfig();

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
