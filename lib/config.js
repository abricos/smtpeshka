'use strict';

var path = require('path');
var config = require('tree-config');
var configLogger = require('tree-config-logger');

config.PluginManager.register('logger', configLogger);

config.configure({
    sources: [
        {
            type: 'json',
            src: '.smtpeshka.json'
        }, {
            type: 'json',
            cwd: path.join(__dirname, '..'),
            key: 'package',
            src: 'package.json'
        }, {
            type: 'json',
            src: 'smtpeshka.json'
        }
    ]
});

config.setDefaults({
    directory: process.cwd(),
    _libDirectory: path.join(__dirname, '..'),
    log: {
        console: {
            level: 'info',
            colorize: 'true',
            timestamp: 'HH:MM:ss',
            label: 'smtpeshka'
        }
    },
    web: {
        port: 2580
    },
    SMTP: {
        port: 2525
    },
    transport: {
        json: {
            saveto: '<%= directory %>/sent-emails'
        }
    },
    haraka: {
        prog: {
            dir: '<%= _libDirectory %>/node_modules/Haraka'
        },
        config: {
            source: {
                dir: '<%= _libDirectory %>/haraka-def'
            },
            build: {
                dir: '/tmp/smtpeshka/haraka'
            }
        }
    }
});

module.exports = config;
