var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.post('/postjson', function(req, res, next) {
  /*if (!req.body.obj) {res.status(404).send()}
  if (!maindata[req.body.obj]) {res.status(404).send()}*/
  console.log(maindata[req.body.obj]);
});

module.exports = router;
