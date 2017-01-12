var Parse = require('parse/node').Parse;
var fs = require('fs');

Parse.initialize('app', 'id');
Parse.serverURL = 'http://localhost:1337/parse';

var data = fs.readFileSync('./test_data/demo11.zip');
var file = new Parse.File('demo11.zip', {base64 : data.toString('base64')});

file.save().then(function() {
	// file has been saved
	console.log('file has been saved');
}, function(error) {
	// file could note be saved
	console.log(error);
});

console.log('hello world');