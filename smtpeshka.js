'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

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

        var harakaScript = path.join(base, 'node_modules/Haraka/bin/haraka');
        var haraka = spawn(harakaScript, ['-c', harakaConfigDir]);
        var isStartHaraka = false;

        haraka.stdout.on('data', function(data){
            if (data.toString().match(/Starting up Haraka/)){
                isStartHaraka = true;
            }
        });

        haraka.stderr.on('data', function(data){
            console.log('ERROR (Haraka) : ' + data);
        });

        process.on("SIGINT", function(){
            haraka.kill("SIGINT");
        });

        haraka.on("exit", function(code){
            process.exit(code);
        });

        _servers = {
            web: webServer,
            haraka: haraka
        };

        var timeCounter = 0;
        var waiting = setInterval(function(){

            timeCounter++;
            if (timeCounter > 100){
                module.exports.stop();
                throw new Error('Haraka server not started');
            }

            if (isStartHaraka){
                clearInterval(waiting);
                callback ? callback(_servers) : null;
            }

        }, 100);
    });

};

module.exports.stop = function(){
    if (!_servers){
        return;
    }
    _servers.web.close();
    _servers.haraka.kill();
    _servers = null;
};

