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

function returnMoney() {

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.post('/postjson', function(req, res, next) {
  if (!req.body.obj||!mainjson[req.body.obj]) {res.status(404).send();}
  res.send(mainjson[req.body.obj]);
});

router.post("/nav_json", function(req, res, next) {
  if (!req.body.path) {
    res.status(404).send();
  } else {
    array = [""];
    for (i = 0; i < req.body.path.length; i++) {
      if (req.body.path.substring(i,i+1) != "/") {
        array[array.length-1] += req.body.path.substring(i,i+1);
      } else {
        array.push("");
      }
    }

    var obj = mainjson;
    for (var i = 0; i < array.length; i++) {
      obj = obj[array[i]];
    }
    res.send(obj);
  }
});

router.get('login', function(req, res, next){
  res.render('login', {})
});

/*router.post('login', function(req, res, next){
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
});*/

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

router.post("/unlock_case", function(req, res, next) {
  if (!req.body.case || !req.body.user || !mainjson.cases[req.body.case]) {res.status(404).send();}

  MongoClient.connect(process.env.mongouri, function(err, db){
    if (err) {
      console.log("Failed to establish connection with the database", err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){
        if (data.money < mainjson.cases[req.body.case].price) {
          console.log("User '" + req.body.user + "' does not enough money to unlock a '" + req.body.case + "'");
          res.send(Error("Not enough money"));
        } else {
          var tier = [[],[],[],[],[]];
          mainjson.cases[req.body.case].items.forEach(function(v){
            tier[mainjson.skins[v].rarity-2].splice(0, 0, v);
          });

          var rand = Math.random();
          if (rand <= 0.7879 ) {
            tier = tier[0];
          } else if (rand <= 0.9575) {
            tier = tier[1];
          } else if (rand <= 0.9857) {
            tier = tier[2];
          } else if (rand <= 0.9956) {
            tier = tier[3];
          } else {
            tier = tier[4];
          }
          var skin = tier[Math.floor(Math.random() * tier.length)];

          var st = false;
          if (Math.random() < 0.1) {
            st = true;
          }

          addSkinToInventory(req.body.user, skin, null, st);
          addMoney(req.body.user, mainjson.cases[req.body.case].price*-1);
          res.send({skin:skin, st:st});
        }
      });
      db.close();
    }
  });
});

function addMoney(user, amount) {
  MongoClient.connect(process.env.mongouri, function(err, db){
    if (err) {
      console.log("Failed to establish connection with the database", err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.update({"username": user}, {$inc: {money: amount}});
      db.close();
    }
  });
}

function setMoney(user, amount) {
  MongoClient.connect(process.env.mongouri, function(err, db){
    if (err) {
      console.log("Failed to establish connection with the database", err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.update({"username": user}, {money: amount});
      db.close();
    }
  });
}

router.post("/get_money", function(req, res, next){
  if (!req.body.user) {res.status(404).send();}
  MongoClient.connect(process.env.mongouri, function(err, db){
    if (err) {
      console.log("Failed to establish connection with the database", err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){
        res.send(data.money);
      });
      db.close();
    }
  });
});

router.post("/get_inventory", function(req, res, next) {
  if (!req.body.user) {res.status(404).send();}

  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('Failed to establish connection with the database', err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){res.send(data.inventory);});
      db.close();
    }
  });
});

function addSkinToInventory(user, skin, float, stattrak, souvenir, pattern) {
  if (!float || float > mainjson.skins[skin].minFloat || float < mainjson.skins[skin].maxFloat) {
    float = Number((Math.random() * (mainjson.skins[skin].minFloat - mainjson.skins[skin].maxFloat) + mainjson.skins[skin].maxFloat).toFixed(8));
  }
  if (!stattrak) {stattrak = (Math.random() <= 0.1) ? true : false;}
  stattrak = (mainjson.skins[skin].statTrak) ? stattrak : false;
  souvenir = (mainjson.skins[skin].souvenir && souvenir) ? souvenir : false;
  float = float.toFixed(8);

  //UPDATE THIS WHEN PATTERNS ARE GOING TO BE ADDED
  pattern = [];

  var wear = "";
  if (float <= 0.07)
		wear = "Factory New";
	else if (float <= 0.15)
		wear = "Minimal Wear";
	else if (float <= 0.38)
		wear = "Field-Tested";
	else if (float <= 0.45)
		wear = "Well-Worn";
	else if (float <= 1)
		wear = "Battle-Scarred";
	else {
		throw new Error("Attempted to index a float value greater than 1.0");
	}

  var item = {name:skin,float:float,exterior:wear,stattrak:stattrak,souvenir:souvenir,pattern:pattern}

  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('Failed to establish connection with the database', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection("users");
      collection.update({"username": user},{$push:{inventory:item}});
      db.close();
    }
  });
}

router.post('/get_skin', function(req, res, next) {
  if (!req.body.skin||!mainjson.skins[req.body.skin]) {res.status(404).send()}
  res.send(mainjson.skins[req.body.skin]);
});

router.post("/get_case_contents", function(req, res, next) {
  if (!req.body.case) {
    res.status(404).send();
  } else {
    var items = {};
    mainjson.cases[req.body.case].items.forEach(function(key) {
      items[key] = mainjson.skins[key];
    });
    res.send(items);
  }
});

router.post("/get_skins_on_inventory_page", function(req, res, next) {
  if (!req.body.user) {res.status(404).send();}
  if (!req.body.page) {
    req.body.page = 0;
  }

  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('Failed to establish connection with the database', err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){
        var inv = [];
        var start = req.body.page*25;
        for (var i = 0; i < data.inventory.length-start; i++) {
          inv.push(data.inventory[start+i].name);
        }
        var invSkins = [];
        for (var i = 0; i < inv.length; i++) {
          invSkins.push(mainjson.skins[inv[i]]);
        }
        res.send(invSkins);
      });
      db.close();
    }
  });


});


module.exports = router;
