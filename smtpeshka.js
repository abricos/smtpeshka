'use strict';

var path = require('path');

var HarakaConfig = require('HarakaConfig');

var harakaConfig = new HarakaConfig();
var harakaConfigDir = harakaConfig.build();

var base = path.join(__dirname);

var harakaPath = path.join(base, 'node_modules/Haraka/haraka.js');

/*
process.argv[1] = harakaPath;
process.env.HARAKA = harakaConfigDir;
require(harakaPath);
/**/
