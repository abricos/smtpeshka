var express = require('express');
var router = express.Router();

var treeConfig = require('../../Config');

var getStatus = function(){
    var config = treeConfig.instance();

    return {
        web: config.get('web'),
        SMTP: config.get('SMTP'),
        transport: config.get('transport'),
        haraka: config.get('haraka')
    };

};

router.get('/status', function(req, res, next){
    var config = treeConfig.instance();

    res.render('status', {
        title: 'Status',
        version: config.get('package.version'),
        config: getStatus()
    });
});

router.get('/api/status', function(req, res, next){
    var status = getStatus();
    res.json(status);
});

module.exports = router;
