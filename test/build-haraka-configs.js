'use strict';

var fs = require('fs');
var should = require('should');
var path = require('path');

var HarakaConfig = require('../lib/HarakaConfig');
var harakaConfig,
    harakaConfigsDir;

describe('SMTPeshka Build configs for Haraka', function(){

    it('create instance', function(done){
        harakaConfig = new HarakaConfig();

        should.exist(harakaConfig);

        done();
    });

    it('build Haraka configs in `[CWD]/tmp`', function(done){
        var tempDir = path.join(process.cwd(), 'tmp');
        var appConfig = harakaConfig.appConfig;

        appConfig.set('temp.dir', tempDir);

        var buildDir = appConfig.get('smtpeshka.haraka.config.build.dir');
        should(buildDir).be.type('string');

        harakaConfigsDir = harakaConfig.build();

        var exist = fs.existsSync(harakaConfigsDir);
        exist.should.be.ok;

        done();
    });

});
