var express = require('express');
var router = express.Router();

var config = require('../../config');

var data = require('../../data');

router.get('/', function(req, res, next){

    data.reload();

    res.render('index', {
        title: 'Home',
        version: config.get('package.version'),
        emails: data.list
    });
});

router.get('/email/:id', function(req, res, next){

    data.reload();

    var messageIdHash = req.params.id;
    var email = data.getByMessageIdHash(messageIdHash);

    res.render('email', {
        title: 'Email ' + messageIdHash,
        version: config.get('package.version'),
        email: email,
        query: {
            showin: req.query.showin ? req.query.showin : ''
        }
    });

});

router.get('/api', function(req, res, next){
    data.reload();

    res.json(data.list);
});

router.get('/api/email/:id', function(req, res, next){
    data.reload();

    var messageIdHash = req.params.id;
    var email = data.getByMessageIdHash(messageIdHash);

    res.json(email);
});


module.exports = router;
