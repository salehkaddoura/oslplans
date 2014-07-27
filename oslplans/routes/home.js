var express = require('express');
var router = express.Router();

var request = require('request'); // "Request" library

var querystring = require('querystring');
var stateKey = 'spotify_auth_state';
var client_id = 'e43d7dee14a04daa96f38b64c8473005';
var client_secret = 'f56d58b73187437c93ddccac9f264db1';
var redirect_uri = 'http://osplans.ahv.io/spotify';

router.get('/', function(req, res) {

  // requests refresh and access tokens

  var code = req.query.code || null;
  res.clearCookie(stateKey);
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
      client_id: client_id,
      client_secret: client_secret
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (response.statusCode === 200) {

      var access_token = body.access_token,
          refresh_token = body.refresh_token;

      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        console.log(JSON.parse(body));
      });

      /*
      // we can also pass the token to the browser to make requests from there
      res.redirect('/home?' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        })); */
    } else {
      res.redirect('/home?' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

module.exports = router;