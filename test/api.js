'use strict';

var should = require('should');
var fs = require('fs');
var path = require('path');
var treeConfig = require('../lib/Config');
var config = treeConfig.instance();

var tempDir = path.join(__dirname, '../tmp');

describe('SMTPeshka API functions:', function(){

    before(function(done){
        config.set('temp.dir', tempDir);
        done();
    });

    after(function(done){
        treeConfig.clean();
        done();
    });

    it('should be started Web-server and Haraka SMTP-server', function(done){
        require(path.join(__dirname, '../lib/web'));
        done();
    });

    it('should be sended e-mail', function(done){
        done();
    });
});
