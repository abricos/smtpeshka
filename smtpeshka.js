'use strict';

var path = require('path');

var HarakaConfig = require('./lib/HarakaConfig');

var harakaConfig = new HarakaConfig();

harakaConfig.build(function(err, harakaConfigDir){

    var base = path.join(__dirname);
    var webServer = path.join(base, 'lib/web/index.js');

    // start web server
    require(webServer);

    var harakaPath = path.join(base, 'node_modules/Haraka/haraka.js');

    process.argv[1] = harakaPath;
    process.env.HARAKA = harakaConfigDir;

    //start SMTP Hakara server
    require(harakaPath);

});
