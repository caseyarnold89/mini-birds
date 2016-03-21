var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
var port = 9050;

var db = mongojs('birds', ['sightings']);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function(req, res) {
    
    db.sightings.save(req.body, function (err, response) {
        if (err) return res.status(500).json(err)
        else return res.json(response);

    })
    
});

app.get('/api/sighting', function(req, res) {
    var query = {};
    
    if (req.query.region) { 
        query = { region: req.query.region} 
    }
    else if (req.query.species) {
        query = { species: req.query.species }
    } 
    db.sightings.find(query, function(err, response){
        if(err) return res.stats(500).json(err)
        else return res.json(response);
    })
});
app.put('/api/sighting', function(req, res) {
    
    if (!req.query.id) return res.status(418).send('request query id required');
    db.sightings.findAndModify(
        { query: {
            _id: mongojs.ObjectId(req.query.id)
            },
          update: {
              $set: req.body
          }
        },
        function(err, response) {
            if(err) return res.status(500).json(err)
            else return res.json(response)
        }
    )

});
app.delete('/api/sighting',function(req, res) {
    if(!req.query.id) return res.status(418).send('request query id required');
    db.sightings.remove(
        { _id: mongojs.ObjectId(req.query.id) }, 
        function (err, response) {
            if(err) return res.status(500).json(err)
            else return res.json(response);
        }
    )
});
app.listen(port, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('Now listening on port: ', port);
})