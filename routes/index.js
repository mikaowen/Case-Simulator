var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

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

router.post("/unlock_case", function(req, res, next) {
  if (!req.body.case || !req.body.user || !mainjson.cases[req.body.case]) {res.status(404).send();}

  MongoClient.connect(process.env.mongouri, function(err, db){
    if (err) {
      console.log("Failed to establish connection with the database", err);
    } else {
      console.log("Connected correctly to server");

      var collection = db.collection("users");
      collection.findOne({"username": req.body.user}, function(err, data){
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
        res.send({skin:skin, st:st});
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

/*
PARAMETERS FOR /buy_shop_item:
req.body.user: the user <string>
req.body.item: the item (a skin, a case or a key) <string>
if your item is a skin you will have 2 more required fields!
  req.body.st: the stattrak value of the skin <boolean>
  req.body.exterior: the exterior of the skin <string>
*/
router.post("/buy_shop_item", function(req, res, next) {
  if ((!req.body.user || !req.body.item) || (req.body.item.type == "skin" && (req.body.st == null || req.body.exterior == null)) {
    res.status(404).send();
  } else {
    MongoClient.connect(process.env.mongouri, function(err, db) {
      if (err) {
        console.log('Failed to establish connection with the database', err)
      } else {
        console.log("Connected correctly to server");

        var item = "";
        var price = 0;
        if (req.body.item.type == "skin") {
          item = mainjson.skins[req.body.item];
          var st = 0;
          if (req.body.st) {
            st = 1;
          }
          var wear = 0;
          if (req.body.exterior == "Minimal Wear") {
            wear = 1;
          } else if (req.body.exterior == "Field-Tested") {
            wear = 2;
          } else if (req.body.exterior == "Well-Worn") {
            wear = 3;
          } else if (req.body.exterior == "Battle-Scarred") {
            wear = 4;
          }
          price = item.price[st][wear];
        } else if (req.body.item.type == "key") {
          item = mainjson.keys[req.body.item];
          price = item.price;
        } else if (req.body.item.type == "case") {
          item = mainjson.cases[req.body.item];
          price = item.price;
        }

        var collection = db.collection("users");
        collection.findOne({"username": req.body.user}, function(err, data) {
          if (err) {
            res.status.send(500);
          } else {
            if (data.money < price) {
              res.status(500).send()
            } else {
              if (item.type == "skin") {
                addSkinToInventory(req.body.user, req.body.item, null);
              }
            }
          }
        });
      }
    });
  }
});


module.exports = router;
