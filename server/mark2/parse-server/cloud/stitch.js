var generateImageAudioList = function(files) {

	var filenamesArray = Object.keys(files);
	var imageNames = [];
	var audioNames = [];

	for(var i=0; i<filenamesArray.length; i++) {
		var filename = files[filenamesArray[i]]['name'];
		var splitArray = filename.split('/');

		// image
		if (splitArray[splitArray.length-2] == 'images') {
			if(filename.endsWith('.png') || filename.endsWith('.jpg')) {
				imageNames.push(filename);
			}	
		}

		// audio
		if (splitArray[splitArray.length-2] == 'audio') {
			if(filename.endsWith('.wav')) {
				audioNames.push(filename);
			}
		}
	}

	return [imageNames, audioNames];
}

var validateImageAudioList = function(array) {
	var imagesArray = array[0];
	var audioArray = array[1];

	var audioCheckArray = [];
	for(var i=0; i<)
	for(var i=0; i<audioArray; i++) {

	}
}

module.exports = {
	generateImageAudioList,
	validateImageAudioList
}