var express = require('express');
var router = express.Router();

var treeConfig = require('../../Config');

var data = require('../../data');

/* GET home page. */
router.get('/', function(req, res, next){

    var config = treeConfig.instance();

    data.reload();

    res.render('index', {
        title: '',
        version: config.get('package.version'),
        emails: data.list
    });
});

module.exports = router;
