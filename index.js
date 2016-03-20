var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
var port = 9050;

app.use(bodyParser.json());

app.listen(port, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('Now listening on port: ', port);
})