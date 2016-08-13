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
  if (!req.body.obj||!mainjson[req.body.obj]) {res.status(404).send();}
  res.send(mainjson[req.body.obj]);
});

router.post("/nav_json", function(req, res, next) {
  if (!req.body.obj || !mainjson[req.body.obj] || !mainjson) {res.status(404).send();}
  if (!req.body.obj instanceof Array) {res.status(400).send();}

  var obj = mainjson;
  for (var i = 0; i < req.body.obj.length; i++) {
    obj = obj[req.body.obj[i]];
  }
  res.send(obj);
});

router.post('/getskin', function(req, res, next) {
  /*MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection('users');
      collection.find({})
    }
  });
  if (!req.body.skins||!mainjson.skins[req.body.skin]) {res.status(404).send()}
  res.send(mainjson.skins[req.body.skin]);
});

router.get('login', function(req, res, next){
  res.render('login', {})
});

router.post('login', function(req, res, next){
  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection('users');
      collection.findOne({
        "username": req.body.username,
        "password": req.body.password,
      },function(err, user) {
        if(err) {
          console.log(err);
          res.status(500).send();
        }

        if (!user) {
          res.status(404).send();
        }
        req.session.user = user
      }
      );
    }
  }
});

router.post('/newuser', function(req, res, next) {
  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection('users');
      collection.insertOne({
        "username": req.body.username,
        "password": req.body.password,
      });
    }
    db.close();
  });
  if (!req.body.skins||!mainjson.skins[req.body.skin]) {res.status(404).send()}
  res.send(mainjson.skins[req.body.skin]);
});

router.post("/add_skin_to_inventory", function(req, res, next) {
  if (!req.body.user || !req.body.skin) {res.status(404).send();}
  if (!req.body.float || req.body.float > mainjson.skins[req.body.skin].minFloat || req.body.float < mainjson.skins[req.body.skin].maxFloat) {
    req.body.float = Number((Math.random() * (mainjson.skins[req.body.skin].minFloat -mainjson.skins[req.body.skin].maxFloat) + mainjson.skins[req.body.skin].maxFloat).toFixed(8));
  }
  if (!req.body.stattrak) {req.body.stattrak = (Math.random() <= 0.1) ? true : false;}
  req.body.stattrak = (mainjson.skins[req.body.skin].statTrak) ? req.body.stattrak : false;
  req.body.souvenir = (mainjson.skins[req.body.skin].souvenir && req.body.souvenir) ? req.body.souvenir : false;
  req.body.float = req.body.float.toFixed(8);

  //UPDATE THIS WHEN PATTERNS ARE GOING TO BE ADDED
  req.body.pattern = [];

  var wear = "";
  if (req.body.float <= 0.07)
		wear = "Factory New";
	else if (req.body.float <= 0.15)
		wear = "Minimal Wear";
	else if (req.body.float <= 0.38)
		wear = "Field-Tested";
	else if (req.body.float <= 0.45)
		wear = "Well-Worn";
	else if (req.body.float <= 1)
		wear = "Battle-Scarred";
	else {
		throw new Error("Attempted to index a float value greater than 1.0");
	}

  var skin = {name:req.body.skin,float:req.body.float,exterior:wear,stattrak:req.body.stattrak,souvenir:req.body.souvenir,pattern:req.body.pattern}

  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('Failed to establish connection with the database', err)
    } else {
      console.log("Connected correctly to server");
      console.log(skin);
      var collection = db.collection("users");
      collection.update({"username": req.body.user},{$push:{inventory:skin}});
      db.close();
    }
  });
  res.send(skin);
});

router.post("/get_inventory", function(req, res, next) {
  if (!req.body.user) {res.status(404).send();}

  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('Failed to establish connection with the database', err)
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){res.send(data.inventory);});
      db.close();
    }
  });
});


module.exports = router;
