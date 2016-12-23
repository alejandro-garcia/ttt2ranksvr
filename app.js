// var express = require('express');
// var Schema = require('./schema');
// var bodyParser = require("body-parser");
// var methodOverride = require("method-override");
// var mongoose = require('mongoose');
// var graphql = require('graphql').graphql;
// var graphQLHTTP = require('express-graphql');

import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql';

var app = express();

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));


mongoose.connect('mongodb://localhost/ttt2ranks', function(err, res) {  
   if(err) {
     console.log('ERROR: connecting to Database. ' + err);
   }
   else {
       console.log('app.js -- mongo connected');
   }
});

// start server
var server = app.listen(3000, () => {
  console.log('Listening at port', server.address().port);
});


// app.use(bodyParser.urlencoded({ extended: false }));  
// app.use(bodyParser.json());  
// app.use(methodOverride());

// var router = express.Router();

// // router.get('/', function(req, res) {  
// //    res.send("Hello World!");
// // });

// app.use(router);

//console.log ("conectando con la bd mongodb ttt2ranks");

// mongoose.connect('mongodb://localhost/ttt2ranks', function(err, res) {  
//   if(err) {
//     console.log('ERROR: connecting to Database. ' + err);
//   }

//   var query = 'query { peleadores { charId, name, rankPoints } }';
  
//   console.log ("probando query graphql...");
   
//   graphql(Schema, query).then( function(result) {  
//      console.log(JSON.stringify(result,null," "));
//   });

  
  
//   app.use('/', graphQLHTTP( { schema: Schema, pretty: true }));

//   app.listen(3000, function() {
//     console.log("Node server running on http://localhost:3000");
//   });
// });

// console.log ("probando query graphql...");
  
//   var query = 'query { peleadores(charId:1) { name } }';
//   graphql(Schema, query).then( function(result) {  
//      console.log(JSON.stringify(result,null," "));
//   });

  
//   // GraphqQL server route
//   app.use('/graphql', graphqlHTTP(req => ({
//     schema: Schema,
//     pretty: true,
//     graphiql: true
//   })));
    
//   //app.use('/', graphQLHTTP( { schema: Schema, pretty: true }));

//   app.listen(3000, function() {
//     console.log("Node server running on http://localhost:3000");
//   });

