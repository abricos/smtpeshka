'use strict';

var fs = require('fs');
var should = require('should');
var path = require('path');

var testConfig = require('./lib/testConfig');
var HarakaConfig = require('../lib/HarakaConfig');

describe('SMTPeshka Build configs for Haraka', function(){

    var harakaConfig;

    before(function(done){
        testConfig();
        done();
    });

    after(function(done){
        testConfig.clean();
        done();
    });

    it('create instance', function(done){
        harakaConfig = new HarakaConfig();

        should.exist(harakaConfig);

        done();
    });

    it('build Haraka configs to `process.cwd()/tmp`', function(done){
        var appConfig = harakaConfig.appConfig;

        var buildDir = appConfig.get('smtpeshka.haraka.config.build.dir');
        should(buildDir).be.type('string');

        harakaConfig.build(function(err, harakaConfigsDir){
            should.not.exist(err);
            should(harakaConfigsDir).be.type('string');

            done();
        });

    });

});
