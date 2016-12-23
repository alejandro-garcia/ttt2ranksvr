var express = require('express');
var Schema = require('./schema');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var graphql = require('graphql').graphql;
var graphQLHTTP = require('express-graphql');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

// router.get('/', function(req, res) {  
//    res.send("Hello World!");
// });

app.use(router);

console.log ("conectando con la bd mongodb ttt2ranks");

mongoose.connect('mongodb://localhost/ttt2ranks', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  var query = 'query { peleadores { charId, name, rankPoints } }';
  console.log ("probando query graphql...");
  
  graphql(Schema, query).then( function(result) {  
     console.log(JSON.stringify(result,null," "));
  });
  
  app.use('/', graphQLHTTP( { schema: Schema, pretty: true }));

  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

