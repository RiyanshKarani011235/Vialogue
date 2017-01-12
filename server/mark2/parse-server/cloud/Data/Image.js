var Parse = require('parse').Parse;

var Image = Parse.Object.extend('Image', {
	// instance methods
	initialize: function(attrs, options) {
		console.log(attrs);
		console.log(options);
	}

}, {
	// class methods
});

module.exports = {
	Image
}