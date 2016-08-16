var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

router.post('/login', function(req, res, next){
  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err)
    } else {
      console.log("Connected correctly to server");
      var collection = db.collection('users');
      collection.findOne({
        "username": req.body.username
      },function(err, user) {
        if(err) {
          console.log(err);
          res.status(500).send();
        }

        if (!user) {
          res.status(404).send();
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (!result) {
              res.status(404).send();
            } else {
              req.session.user = JSON.stringify(user);
              req.session.save(function (err) {
                if (err) return next(err);
                res.status(200).send();
              })
            }
          });
        }
      }
      );
    }
  });
});

router.post('/logout', function(req, res){
  req.session.destroy();
  res.status(200).send();
})

/* for development/testing purposes only */
router.get('/loggedin', function(req, res, next){
  if(!req.session.user) {
    res.status(401).send();
  } else {
    res.status(200).send();
  }
});

router.post('/newuser', function(req, res, next) {
  MongoClient.connect(process.env.mongouri, function(err, db) {
    if (err) {
      console.log('u dun goofed: ', err);
    } else {
      var collection = db.collection('users');
      collection.findOne({"username": req.body.username}, function(err, data) {
        if (data) {
          res.send('User already exists')
          db.close();
        } else {
          bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
              console.log(err);
            } else {
              bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(collection.insertOne({
                    "username": req.body.username,
                    "password": hash
                  }));
                  db.close();
                }
              });
            }
          })
          res.send();
        }
      });
    }
  });
});

module.exports = router
