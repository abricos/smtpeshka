'use strict';

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');

var config = require('../../lib/config');
var tempDir = path.join(__dirname, '../../tmp');

module.exports.clean = function(){

    fse.removeSync(tempDir);

    config.set('log.console.level', 'warn');
    config.set('web.port', 12580);
    config.set('SMTP.port', 12525);
    config.set('transport.json.saveto', path.join(tempDir, 'sent-emails'));
    config.set('haraka.config.build.dir', path.join(tempDir, 'haraka'));

    return config;
};

