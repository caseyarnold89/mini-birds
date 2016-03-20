var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
var port = 9050;

var db = mongojs('birds', ['products']);

app.use(bodyParser.json());

app.post('/api/sighting', function(req, res) {
    
    
    
    return res.status(200).json("Post works");
});
app.get('/api/sighting', function(req, res) {
    console.log(req.query);
    return res.status(200).json("Get works");
});
app.put('/api/sighting', function(req, res) {
    console.log(req.query);
    return res.status(200).json("Put works");
});
app.delete('/api/sighting',function(req, res) {
    console.log(req.query);
    return res.status(200).json("Delete works");
});
app.listen(port, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('Now listening on port: ', port);
})