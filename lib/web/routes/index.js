var express = require('express');
var router = express.Router();

var treeConfig = require('../../Config');

var config = treeConfig.instance();

/* GET home page. */
router.get('/', function(req, res, next){
    res.render('index', {
        title: 'Express',
        version: config.get('package.version')
    });
});

module.exports = router;
