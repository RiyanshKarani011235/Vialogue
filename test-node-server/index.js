var Parse = require('parse/node').Parse;
var fs = require('fs');

Parse.initialize('app', 'id', 'master');
Parse.serverURL = 'http://localhost:1337/parse';

var id = "ZsMHSSftPf";
var json = {
	"id": id,
	"parent": id,
	"original_parent": id,
	"category": "S5i3Ou2206",
	"language": "s1L99KeQ1z",
	"author": "FGyRgBiBw5",
	"name": "hello world",
	"is_dubbed": true,
	"resolution_x": 1080,
	"resolution_y": 721,
	"slide_ordering_sequence": [1, 2, 3, 3, 4]
};

Parse.Cloud.run('uploadJson', json).then(
	function(o) {
		console.log(o);
	}, function(error) {
		console.log(error);
	}
);	