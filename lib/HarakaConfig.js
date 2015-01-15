'use strict';

var fse = require('fs-extra');
var Config = require('./Config');

var HarakaConfig = function(){
    this.appConfig = Config.instance('smtpeshka');
};

HarakaConfig.prototype.build = function(){
    var config = this.appConfig,
        logger = config.logger(),
        sourceDir = config.get('smtpeshka.haraka.config.source.dir'),
        buildDir = config.get('smtpeshka.haraka.config.build.dir');

    logger.debug('Temporary build directory for Haraka configs: ' + buildDir);

    try {
        fse.ensureDirSync(buildDir);
    } catch (err) {
        logger.error('Unable to create directory for Haraka configs, err: ' + err.message);
    }
    return buildDir;
};

module.exports = HarakaConfig;