var path = require("path"),
  twitter = require('../config.js');

exports.index = function(req, res){
res.render('twit', { title: "Twitter Stuff"});
};

exports.ping = function(req, res){
res.send("pong!", 200);
};

exports.search = function(req, res){
// search twitter api for friends
	var username = req.query.search,
	    friends = [];

	twitter.get('friends/list', { screen_name: username, count: 90 }, function(err, data){
	  if(err) {
	    res.send("<br>Error! Rate limit exceeded.");
	    console.log(err)
	    return;
	  };
	  
	  for (var i = 0; i < (data.users).length; i++) {
	    // search twitter for info about the relationship between two users
	    twitter.get('friendships/show', {source_screen_name: username, target_screen_name: data.users[i].screen_name}, 
	      function(error, results){
	        if(err) {
	          console.log(err)
	          res.send("<br>Error! Rate limit exceeded.");
	          return;
	        };
	        friends.push(results.relationship.target);
	        // continue to loop until all data is added to the array
	        if (friends.length === (data.users).length) {
	          res.send(friends)
	        };
	      });
	  };

	})
};

