
var express = require('express');
var logger = require('./logger');
var app = express();
var xlsx = require("node-xlsx").default;
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var students = require('./routes/students');
var residencies = require('./routes/residencies');
var genders= require('./routes/genders');
var advStandings = require('./routes/advStandings');



app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);
//app.use(express.static('public'));

app.use('/students', students);
app.use('/residencies', residencies);
app.use('/genders', genders);
app.use('/advStandings', advStandings);

app.post('/upload', function(request, response){
    console.log('entering upload route');
    //var name = request.body.upload.name;
    // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  console.log(form.uploadDir);
  //console.log(request.name);
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  console.log('outside file');
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    console.log('inside file');
  });
  // log any errors that occur
  console.log('outside error');
  form.on('error', function(err) {
    
    console.log('inside error - An error has occured: \n' + err);
  });
  // once all the files have been uploaded, send a response to the client
  console.log('outside end');
  form.on('end', function() {
    console.log('inside end');
    //console.log(request);
    response.end('success');
    //response.end(request);
  });
  // parse the incoming request containing the form data
  form.parse(request);
});

/*
app.post('/upload', function(request, response){
    console.log("hi");
    var name = request.body.upload.name;
    console.log(name);
    var json = request.body.upload.jsonTxt;
    json2 = json["MOCK_DATA (1)"];
    if(json2 == null){
        json = json["MOCK_DATA (1)"];
    }
    else{
        json = json2;
    }
    console.log(json);
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost/studentsRecords';

    var insertDocument = function(db, callback) {
       db.collection(name).insert(json, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the " + name + " collection.");
        callback();
      });
    };

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      insertDocument(db, function() {
          db.close();
      });
    });
});*/

app.listen(3700, function () {
    console.log('Listening on port 3700');
});
