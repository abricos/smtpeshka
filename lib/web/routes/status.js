var express = require('express');
var router = express.Router();

var treeConfig = require('../../Config');

router.get('/status', function(req, res, next){
    var config = treeConfig.instance();

    res.render('status', {
        title: 'Status',
        version: config.get('package.version'),
        config: config.get('smtpeshka')
    });
});

router.get('/api/status', function(req, res, next){
    var config = treeConfig.instance();
    res.json(config.get('smtpeshka'));
});

module.exports = router;
