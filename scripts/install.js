#!/usr/bin/env node

var fse = require('fs-extra');
var path = require('path');

var srcDir = path.join(__dirname, '../node_modules/bootstrap/dist');
var destDir = path.join(__dirname, '../public/vendor/bootstrap');

fse.copy(srcDir, destDir, function(err){
    if (err){
        console.log('npm post-install error: ' + err);
    } else {
        console.log('npm post-install success');
    }
});