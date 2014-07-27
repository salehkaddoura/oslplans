var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  access_token = req.query.access_token;
  console.log(access_token);
  res.render('home', { title: 'Express' });
});

module.exports = router;