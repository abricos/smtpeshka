var express = require('express');
var router = express.Router();

var config = require('../../Config').instance();

var data = require('../../data');

/* GET home page. */
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

    var messageId = req.params.id;
    var email = data.getByMessageId(messageId);

    res.render('email', {
        title: 'Email ' + messageId,
        version: config.get('package.version'),
        email: email,
        query: {
            showin: req.query.showin ? req.query.showin : ''
        }
    });

});


module.exports = router;
