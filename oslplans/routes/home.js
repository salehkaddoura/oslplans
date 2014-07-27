var express = require('express');
var router = express.Router();
var request = require('request'); // "Request" library

var artists=new Array()

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
    user_id = body.id;
    options = {
      url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    
    request.get(options, function(error, response, body) {
      console.log(body.items);
      for(i=0; i<body.items.length; i++){
        console.log(body.items[i].id);
        options = {
          url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + body.items[i].id + '/tracks',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        
        request.get(options, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            for(j=0;j<body.items.length; j++){
              try{
                if(artists.indexOf(body.items[i].track.artists[0].name)==-1){
                  artists.push(body.items[i].track.artists[0].name);
                }
              }
              catch(err){}
            }
          }
        });
      }
    });
  });
  
  console.log(artists);
  
  res.render('home', { title: 'Express' });
});

module.exports = router;
