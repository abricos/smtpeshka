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
    config.set('temp.dir', tempDir);
    config.set('smtpeshka.transport.json.saveto', path.join(tempDir, 'sent-emails'));
    config.set('smtpeshka.haraka.config.build.dir', path.join(tempDir, 'haraka'));

    return config;
};

module.exports = testConfig;

module.exports.clean = function(){

    treeConfig.clean();

    fse.removeSync(tempDir);

};

