'use strict';

var path = require('path');

var HarakaConfig = require('./lib/HarakaConfig');

var _servers;

module.exports.start = function(callback){

    var harakaConfig = new HarakaConfig();

    harakaConfig.build(function(err, harakaConfigDir){
        if (_servers){
            return callback ? callback(_servers) : null;
        }

        var base = path.join(__dirname);
        var webServerPath = path.join(base, 'lib/web/index.js');

        // start web server
        var webServer = require(webServerPath);

        var harakaProgDir = path.join(base, 'node_modules/Haraka')

        var harakaPath = path.join(harakaProgDir, 'server.js');

        process.argv[1] = harakaPath;
        process.env.HARAKA = harakaConfigDir;

        // start SMTP Hakara server
        var harakaServer = require(harakaPath);
        harakaServer.createServer();

        _servers = {
            web: webServer,
            haraka: harakaServer
        };

        return callback ? callback(_servers) : null;
    });

};

module.exports.stop = function(){
    if (!_servers){
        return;
    }
    _servers.web.close();
    _servers.haraka.close();
};

