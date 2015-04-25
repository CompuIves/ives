var express = require('express');
var http = require('http');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var nodemailer = require('nodemailer');
var mailsettings = JSON.parse(fs.readFileSync(path.join(__dirname, 'mailsettings.json'), 'utf8'));

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//--- Mail server //
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: mailsettings.service,
    auth: {
        user: mailsettings.user,
        pass: mailsettings.pass
    }
});

app.post('/mail', function(req, res) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.name + '<' + req.body.email + '>', // sender address
        to: mailsettings.user + ", " + mailsettings.user2, // list of receivers
        subject: req.body.subject, // Subject line
        html: "<b>Email: </b>" + req.body.email + "<br><b>Message:</b><br>" + req.body.message // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Message sent: ' + info.response)
            res.status(200).send('Message sent: ' + info.response);
        }
    });
})
//---------------//

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
//app.use(favicon(path.join(__dirname, "public", "res", "favicon.ico")));
app.use(express.static(path.join(__dirname, 'app')));


var server = app.listen(app.get('port'), function() {
    console.log("App running on port " + this.address().port + "!");
});
