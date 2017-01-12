var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var parse = require('node-parse-api');
var path = require('path');

'var databaseUri = 'mongodb://localhost:27017/test';

var api = new ParseServer({
	databaseURI: databaseUri,
	cloud: __dirname + '/cloud/main.js',
	appId: 'app',
	masterKey: 'master',
	serverURL: 'http://localhost:1337/parse',
	liveQuery: {
		classNames: ["posts", "comments"]
	}
});

var app = express();

app.use('/parse', api);

app.get('/parse', function(req, res) {
	res.write('hello world');
	res.send();
});

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function() {
	console.log('parse serrver running on port 1137');
});

ParseServer.createLiveQueryServer(httpServer);'

