var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

var mainjson = require("../main.json");

/*
MongoDB connection template

MongoClient.connect(process.env.mongouri, function(err, db) {
  if (err) {
    console.log('u dun goofed: ', err)
  } else {
    console.log("Connected correctly to server");
  }
}

*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.post('/postjson', function(req, res, next) {
  if (!req.body.obj||!mainjson[req.body.obj]) {res.status(404).send()}
  res.send(mainjson[req.body.obj]);
});

router.post("/nav_json", function(req, res, next) {
  if (!req.body.obj || !mainjson[req.body.obj] || !mainjson) {res.status(404).send()}
  if (!req.body.obj instanceof Array) {res.status(400).send()}

  var obj = mainjson;
  for (var i = 0; i < req.body.obj.length; i++) {
    obj = obj[req.body.obj[i]];
  }
  res.send(obj);
});

router.post('/getskin', function(req, res, next) {
  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection('users');
      collection.find('')
    }
  }
  if (!req.body.skins||!mainjson.skins[req.body.skin]) {res.status(404).send()}
  res.send(mainjson.skins[req.body.skin]);
});

module.exports = router;
