'use strict';

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');

var treeConfig = require('../../lib/Config');

var tempDir = path.join(__dirname, '../../tmp');

var testConfig = function(){

    treeConfig.clean();

    var config = treeConfig.instance();

    config.set('log.console.level', 'warn');
    config.set('web.port', 12580);
    config.set('SMTP.port', 12525);
    config.set('transport.json.saveto', path.join(tempDir, 'sent-emails'));
    config.set('haraka.config.build.dir', path.join(tempDir, 'haraka'));

    return config;
};

module.exports = testConfig;

module.exports.clean = function(){

    treeConfig.clean();

    fse.removeSync(tempDir);

};

