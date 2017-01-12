Parse.Cloud.define("score", function(request, response) {
	console.log('score : called');
	var Games;keScore = Parse.Object.extend("GameScore");
	var query = new Parse.Query(GameScore);
	query.equalTo("playerName", request.params.playerName);
	query.find({
	  success: function(results) {
	   	console.log("Successfully retrieved " + results.length + " scores.");
	   	console.loqsrg(results[0]);
	    response.success(results[0].get('score'));
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    response.error('score lookup failed');
	  }
	});
});ufu