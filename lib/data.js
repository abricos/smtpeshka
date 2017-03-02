'use strict';

var fse = require('fs-extra');
var glob = require('glob');
var path = require('path');
var treeConfig = require('./config');

var Data = function(){
    this.appConfig = treeConfig;
    this.list = [];
};

Data.prototype.clear = function(){
    this.list = [];
};

Data.prototype.reload = function(){
    var config = this.appConfig,
        emailsDir = config.get('transport.json.saveto'),
        emails = glob.sync(path.join(emailsDir, '*.json'));

    var email, list = [];
    for (var i = 0; i < emails.length; i++){
        email = fse.readJSONFileSync(emails[i]);
        list.push(email);
    }
    this.list = list;
};

Data.prototype.getByMessageIdHash = function(messageIdHash){
    var list = this.list, email;
    for (var i = 0; i < list.length; i++){
        email = list[i];
        if (email.messageIdHash === messageIdHash){
            return email;
        }
    }
};

module.exports = new Data();