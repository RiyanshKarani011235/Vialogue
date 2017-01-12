var Parse = require('parse/node').Parse;
var fs = require('fs');

Parse.initialize('app', 'id');
Parse.serverURL = 'http://localhost:1337/parse';

var data = fs.readFileSync('./test_data/demo_project.zip');

class myFile extends Parse.File {

}
var file = new myFile('demo11.zip', {base64 : data.toString('base64')});

file.save().then(function() {
	// file has been saved
	console.log('file has been saved');
	// var f = new Parse.Object('f');
	// f.set('file', file);
	// f.save();
	Parse.Cloud.run('uploadProject', {
		file: file
	}).then(function(ratings) {
		console.log('score : ' + ratings);
	});
}, function(error) {
	// file could note be saved
	console.log(error);
});

// console.log('hello world');

