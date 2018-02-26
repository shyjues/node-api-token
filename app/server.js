
var bodyParser = require('body-parser');
var express = require('express');
var _ =  require('lodash');
var fs = require('fs');
var util = require('./util');

const path = require('path');

const app = express();
app.use(bodyParser.json());


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});



//This is the authentication, where it will check if the token is valid or not.
//Suppose we don't have url in this pattern then it must be avoided
app.all('/api/v1/*', [require('./routes/validateRequest')]);

//this doesn't seem to work
app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  res.send({
    "Error":"URI not found"
  });
});

app.listen(4000, ()=>{
    console.info(`started at port: 4000`);
});
