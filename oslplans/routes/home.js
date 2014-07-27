var express = require('express');
var router = express.Router();
var request = require('request'); // "Request" library

/* GET home page. */
router.get('/', function(req, res) {
  access_token = req.query.access_token;
  console.log(access_token);
  
  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };
  
  // use the access token to access the Spotify Web API
  request.get(options, function(error, response, body) {
    console.log(body);
  });
  
  res.render('home', { title: 'Express' });
});

module.exports = router;