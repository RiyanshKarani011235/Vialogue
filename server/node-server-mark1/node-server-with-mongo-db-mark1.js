// var mongoose = require('mongoose');
// var express = require('express');
// var path = require('path');

// mongoose.connect('localhost:27017');

var Parse = require('parse/node').Parse;
Parse.initialize('app', 'id');
Parse.serverURL = 'http://localhost:1337/parse';


var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

console.log('before');
gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    console.log('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log('Failed to create new object, with error code: ' + error.message);
  }
});

var GameScore = Parse.Object.extend("GameScore");
var query = new Parse.Query(GameScore);
query.equalTo("playerName", "Sean Plott");
query.find({
  success: function(results) {
   	console.log("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      console.log(object.id + ' - ' + object.get('playerName'));
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

Parse.Cloud.run('score', {
	playerName: 'Sean Plott'
}).then(function(ratings) {
	console.log('score : ' + ratings);
});
console.log('after');

// Declare the types.
var Post = Parse.Object.extend("Post");
var Comment = Parse.Object.extend("Comment");

// Create the post
var myPost = new Post();
myPost.set("title", "I'm Hungry");
myPost.set("content", "Where should we go for lunch?");

// Create the comment
var myComment = new Comment();
myComment.set("content", "Let's do Sushirrito.");

// Add the post as a value in the comment
myComment.set("parent", myPost);

// This will save both myPost and myComment
myComment.save();