var Project = require('./data/Project').Project;
var JSON2 = require('JSON2');

Parse.Cloud.define('uploadJson', function(request, response) {

	var p;
	new Project(JSON2.stringify(request.params)).then(
	// new Project().then(

		function(result) {
			console.log('result');
			p = result;
			// console.log(result);
			p.save().then(() => {
				console.log(p.id);
				console.log(p._id);
				console.log(p.parent);
				console.log(p._parent);
				console.log(p.originalParent);
				console.log(p._originalparent);
				console.log(p.category);
				console.log(p._category);
				console.log(p.language);
				console.log(p._language);
				console.log(p.author);
				console.log(p._author);
				console.log(p.name);
				console.log(p._name);
				console.log(p.isDubbed);
				console.log(p._isDubbed);
				console.log(p.resolutionX);
				console.log(p._resolutionX);
				console.log(p.resolutionY);
				console.log(p._resolutionY);
				console.log(p.slideOrderingSequence);
				console.log(p._slideOrderingSequence);
				console.log(p.slides);
				console.log(p._slides);
				response.success('successfully saved');
				}, function(error) {
					console.log(error);
				}
			);
		}, function(error) {
			response.error(error.message);
		}
	);

	var obj = Parse.Object.extend('Project');
	var query = new Parse.Query(obj);

	query.get(request.params['id']).then(
		(result) => {
			console.log(result);
		}, (error) => {
			console.log(error);
		}
	);

});
