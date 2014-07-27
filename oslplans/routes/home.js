var express = require('express');
var router = express.Router();
var request = require('request'); // "Request" library

/* GET home page. */
router.get('/', function(req, res) {
  access_token = req.query.code;
  console.log("Recieved access token: " + access_token);
  
  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  
  request.get(options, function(error, response, body) {
    user_id = body.id
    console.log(user_id);
  });
  
  
  
  res.render('home', { title: 'Express' });
});

module.exports = router;