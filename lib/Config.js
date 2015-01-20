'use strict';

var path = require('path');
var treeConfig = require('tree-config');

treeConfig.configure({
    CONFIG_FILE: '.smtpeshka.json',
    OVERRIDE_CONFIG_FILE: 'smtpeshka.json',
    IMPORTS: [{
        key: 'package',
        file: 'package.json'
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
            dir: '/tmp',
            smtpeshka: {
                dir: '<%= temp.dir %>/smtpeshka'
            }
        },
        smtpeshka: {
            'SMTP': {
                'port': '19825'
            },
            'transport': {
                'json': {
                    'saveto': '<%= directory %>/send-emails'
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
                        dir: '<%= temp.smtpeshka.dir %>/haraka'
                    }
                }

            }
        }
    }
});

module.exports = treeConfig;
