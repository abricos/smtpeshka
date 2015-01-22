'use strict';

var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var Config = require('./Config');
var through = require('through2');

var vfs = require('vinyl-fs');

var ConfigParserStream = require('tree-config-parser').ParserStream;

var HarakaConfig = function(){
    this.appConfig = Config.instance();
};

HarakaConfig.prototype.getBuildDir = function(){
    return this.appConfig.get('smtpeshka.haraka.config.build.dir');
};

HarakaConfig.prototype.getSourceDir = function(){
    return this.appConfig.get('smtpeshka.haraka.config.source.dir');
};

HarakaConfig.prototype.buildFile = function(srcFile, callback){

    var config = this.appConfig,
        sourceDir = this.getSourceDir(),
        srcRelFile = path.relative(sourceDir, srcFile),
        buildDir = this.getBuildDir(),
        buildFile = path.join(buildDir, srcRelFile),
        buildFileDir = path.dirname(buildFile);

    try {
        fse.ensureDirSync(buildFileDir);
    } catch (err) {
        var msg = 'Unable to create directory for Haraka configs, err: ' + err.message;
        throw new Error(msg);
    }

    var readStream = fs.createReadStream(srcFile),
        parserStream = new ConfigParserStream(config),
        writeStream = fs.createWriteStream(buildFile);

    readStream
        .pipe(parserStream)
        .pipe(writeStream)
        .on('error', function(){
            var err = new Error('Can not build Haraka config file: ' + buildFile);
            throw err;
        })
        .on('finish', function(){
            return callback(null, buildFile);
        });
};

HarakaConfig.prototype.build = function(callback){
    var config = this.appConfig,
        logger = config.logger(),
        sourceDir = this.getSourceDir(),
        sourceGlob = path.join(sourceDir, '**/*'),
        buildDir = this.getBuildDir();

    logger.debug('Temporary build directory for Haraka configs: ' + buildDir);

    try {
        fse.ensureDirSync(buildDir);
    } catch (err) {
        var msg = 'Unable to create temporary directory for Haraka configs, err: ' + err.message;
        throw new Error(msg);
    }

    var instance = this;
    vfs.src(sourceGlob, {read: false})
        .pipe(through.obj(function(srcFile, enc, pipeCallback){
            if (srcFile.isDirectory()){
                return pipeCallback(null, srcFile);
            }
            instance.buildFile(srcFile.path, function(err){
                return pipeCallback(err);
            });
        }, function(){
            return callback(null, buildDir);
        }));

    return buildDir;
};

module.exports = HarakaConfig;