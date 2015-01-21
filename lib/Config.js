'use strict';

var path = require('path');
var treeConfig = require('tree-config');

treeConfig.configure({
    CONFIG_FILE: '.smtpeshka.json',
    OVERRIDE_CONFIG_FILE: 'smtpeshka.json',
    IMPORTS: [{
        key: 'package',
        file: path.join(__dirname, '..', 'package.json')
    }],
    ROOT_OPTIONS: {
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
        temp: {
            dir: '/tmp'
        },
        smtpeshka: {
            temp: {
                dir: '<%= temp.dir %>/smtpeshka'
            },
            web: {
                port: 2580
            },
            SMTP: {
                port: 2525
            },
            transport: {
                json: {
                    saveto: '<%= directory %>/send-emails'
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
                        dir: '<%= smtpeshka.temp.dir %>/haraka'
                    }
                }

            }
        }
    }
});

module.exports = treeConfig;
