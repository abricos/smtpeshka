'use strict';

var fse = require('fs-extra');
var glob = require('glob');
var path = require('path');
var treeConfig = require('./Config');

var Data = function(){
    this.appConfig = treeConfig.instance();
    this.list = [];
};

Data.prototype.clear = function(){
    this.list = [];
};

Data.prototype.reload = function(){

    var config = this.appConfig,
        emailsDir = config.get('smtpeshka.transport.json.saveto'),
        emails = glob.sync(path.join(emailsDir, '*.json'));

    var email, list = [];
    for (var i = 0; i < emails.length; i++){
        email = fse.readJSONFileSync(emails[i]);
        list.push(email);
    }
    this.list = list;
};

module.exports = new Data();