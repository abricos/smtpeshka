var MailParser = require("mailparser").MailParser;
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');

exports.hook_rcpt = function(next, connection, params){
    next(OK);
};

exports.hook_queue = function(next, connection){
    var txn = connection.transaction;
    if (!txn){
        next();
    }

    var cfg = this.config.get('json.ini');

    var saveToDir = cfg.main.saveto || '/tmp/smtpeshka/send-emails';

    var mailparser = new MailParser();

    mailparser.on("end", function(obj){
        if (!obj || !obj.messageId){
            next(OK);
        }

        var file = path.join(saveToDir, obj.messageId + '.json');
        try {
            fse.ensureDirSync(saveToDir);
            fse.writeJSONFileSync(file, obj);
        } catch (err) {
            connection.logerror(self, 'Error writing message to JSON file: ' + err.message);
            return next(DENYSOFT, 'Save email message to JSON error');
        }

        next(OK);
    });

    txn.message_stream.pipe(mailparser);
};
