var querystring = require('querystring');
var express = require("express");
var router = express.Router(); 
/*
 * GET login page.
 */
exports.home = function (req, res) {
    res.render('login', { title: 'OSLPLANS' });
};




var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';
var client_id = 'ee8c7d67ca8d4961a21be93af98da44d';
var client_secret = '1bcfe0560f8b45de8d4cc2539bea5de3';
var redirect_uri = 'http://osplans.ahv.io/spotify';

/* GET spotify login page. */
router.get('/', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

module.exports = router;

