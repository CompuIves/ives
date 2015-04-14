var express = require('express');
var http = require('http');
var favicon = require('serve-favicon');

var app = module.exports = express();

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