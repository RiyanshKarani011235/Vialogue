var jsZip = require('jszip');
var fs = require('fs');
var stitch = require('./stitch.js');

Parse.Cloud.define('uploadProject', function(request, response) {
	var file = request.params.file;
	// TODO : validate file
	console.log(file);

	var project = new Parse.Object('Project');
	project.set('file', file);
	project.save().then(function(parseFile) {
		response.success(0);
		var url = parseFile.get('file').url();
		Parse.Cloud.httpRequest({ url: url}).then(function(response) {
		  // The file contents are in response.buffer.
		  jsZip.loadAsync(response.buffer).then(function(zip) {
		  		var files = zip.files;
		  		console.log(files);
		  		var v = stitch.generateImageAudioList(files);
		  		console.log(v);
		  		console.log('hello world');
		  });
		});
		console.log(parseFile.get('file').url());
	});

});