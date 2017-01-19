var jsonUtils = require('./jsonUtils.js');
var isInt = require('../utils/typeCheckingUtils.js').isInt;

// constants
const VALID_SLIDE_TYPES = ['image', 'video', 'question'];
const SLIDE_URL_KEYS = ['audio_url', 'image_url', 'question_url', 'video_url'];

class jsonObject {

	constructor(jsonString) {
		// initialize instance variables
		this.string = jsonString;
		this.object = jsonUtils.tryParseJSON(jsonString) || null;
		this.validationErrors = [];

		if(this.object === null) {
			// JSON string is not valid
			return;
		}

		// validate jsonString
		if(!this.validate()) {
			this.object = null;
		}
	}

	validate() {
		return true;
	}

	hasField(field) {
		return this.object[field] !== undefined;
	}
}

class projectJsonObject extends jsonObject {
	/**
	 * validates whether the json represents a valid project JSON
	 * 
	 * {
	 * 		id: ...,
	 * 		parent_id: ...,
	 * 		original_parent_id: ...,
	 * 		name: ...,
	 * 		is_dubbed: ...,
	 * 		category_id: ...,
	 * 		language_id: ...,
	 * 		author_id: ...,
	 * 		resolution_x: ...,
	 * 		resolution_y: ...,
	 * 		slide_ordering_sequence: [...],
	 * 		slides: {
	 * 			id: {
	 * 				layering_objects: [...],
	 * 				hyperlink: ...,
	 * 				type: ...,
	 * 				urls: {
	 * 					audio_url: ...,
	 * 					image_url: ...,
	 * 					video_url: ...,
	 * 					question_url: ...
	 * 				}
	 * 			}, 
	 * 			...
	 * 		}
	 * }
	 * 
	 * @param {String} jsonString - string supposed to represent project JSON
	 * @return {boolean} true if jsonString represents a valid project JSON
	 */
	validate() {

		// this.validateProjectId();
		// this.validateParentProjectId();
		// this.validateOriginalParentProjectId();
		// this.validateProjectName();
		// this.validateIsDubbed();
		// this.validateCategoryId();
		// this.validateLanguageId();
		// this.validateAuthorId();
		// this.validateResolution();
		// this.validateSlides();
		// this.validateSlideIds();

		// if(this.validationErrors.length === 0) {
		// 	return true;
		// } return false;

		return true;

	}

	/**
	 * @param {int | null} id
	 * @return {boolean} true if
	 *		"id" field exists in the JSON and
	 * 			"id" is null or
	 * 			"id" is int and exists in the database
	 */
	validateId(id) {
		// id field should be available in the JSON
		if(!this.hasField(id)) {
			return false;
		}

		var val = this.object[id];
		// id should either be null or integer
		if(val === null) {
			return true;
		}

		// if integer, a project with this id should exist in the database
		if(isInt(val) && this.projectExists(val)) {
			return true;
		} return false;

	}

	// TODO
	// implement actual logic
	projectExists() {
		return true;
	}

	/**
	 * validates the "id" field based on the logic in "this.validateId()"
	 * @return {boolean}
	 */
	validateProjectId() {
		if(!this.validateId('id')) {
			this.validationErrors.push('"id" field not available');
			return false;
		}

		// TODO
		// implement logic specific to project id
		return true;
	}

	/**
	 * validates the "parent_id" field based on the logic in "this.validateId()"
	 * @return {boolean}
	 */
	validateParentProjectId() {
		if(!this.validateId('parent_id')) {
			this.validationErrors.push('"parent_id" field not available');
			return false;
		}

		// TODO
		// implement logic specific to parent project id
		return true;
	}

	/**
	 * validates "original_parent_id" field based on the logic in "this.validateId()"
	 * @return {boolean} true if valid name
	 */
	validateOriginalParentProjectId() {
		if(!this.validateId('original_parent_id')) {
			this.validationErrors.push('"original_parent_id" field not available');
			return false;
		}

		// TODO
		// implement logic specific to original parent project id
		return true;
	}

	/**
	 * validates the "name" field 
	 * @return {boolean} true if
	 * 		"name" field exists in the JSON and
	 * 		value is a valid name
	 */
	validateProjectName() {
		// name field should be available in the JSON
		if(!this.hasField('name')) {
			this.validationErrors.push('"name" field not available');
			return false;
		} 

		var name = this.object['name'];
		// name should not be null
		if(name === null) {
			this.validationErrors.push('"name" field cannot be null');
			return false;
		}

		// TODO
		// implement logic to validate project name
		return true;
	}

	/**
	 * validates the "is_dubbed" field 
	 * @return {boolean} true if
	 * 		"is_dubbed" field exists in the JSON and
	 * 		value is either true of false
	 */
	validateIsDubbed() {
		// is_dubbed field should be available in the JSON
		if(!this.hasField('is_dubbed')) {
			this.validationErrors.push('"is_dubbed" field not available');
			return false;
		}

		// check if the value is either true or false
		var val = this.object['is_dubbed'];
		if(!(val === true || val === false)) {
			this.validationErrors.push('"is_dubbed" field value not valid');
			return false;
		} return true;
	}

	/**
	 * validates the "category_id" field 
	 * @return {boolean} true if
	 * 		"category_id" field exists in the JSON and
	 * 		category_id exists in the database
	 */
	validateCategoryId() {
		// category_id field should be available in the JSON
		if(!this.hasField('category_id')) {
			this.validationErrors.push('"category_id" field not available');
			return false;
		}

		var categoryId = this.object['category_id'];
		// category_id should not be null
		if(categoryId === null) {
			this.validationErrors.push('"category_id" field value not valid');
			return false;
		}

		// TODO
		// check if category id exists in the database
		return true;
	}

	/**
	 * validates the "language_id" field 
	 * @return {boolean} true if
	 * 		"language_id" field exists in the JSON and
	 * 		language_id exists in the database
	 */
	validateLanguageId() {
		// language_id field should be available in the JSON
		if(!this.hasField('language_id')) {
			this.validationErrors.push('"language_id" field not available');
			return false;
		}

		var languageId = this.object['language_id'];
		// language_id should not be null
		if(languageId === null) {
			this.validationErrors.push('"language_id" field value not valid');
			return false;
		}

		// TODO
		// check if language id exists in the database
		return true;
	}

	/**
	 * validates the "author_id" field 
	 * @return {boolean} true if
	 * 		"language_id" field exists in the JSON and
	 * 		language_id exists in the database
	 */
	validateAuthorId() {
		// user_id field should be available in the JSON
		if(!this.hasField('author_id')) {
			this.validationErrors.push('"author_id" field not available');
			return false;
		}

		var authorId = this.object['author_id'];
		// language_id should not be null
		if(authorId === null) {
			this.validationErrors.push('"author_id" field value not valid');
			return false;
		}

		// TODO 
		// check if user_id exists in the database
		return true;
	}

	/**
	 * validates the "resolution_x" and "resolution_y" fields
	 * @return {boolean} true if 
	 * 		"resolution_x" and "resolution_y" fields exist in the JSON and
	 * 		both the above fields have values that are integers
	 */
	validateResolution() {
		// resolution_x and resolution_y should be available in the JSON
		if(!this.hasField('resolution_x')) {
			this.validationErrors.push('"resolution_x" field not available');
			return false;
		}

		if(!this.hasField('resolution_y')) {
			this.validationErrors.push('"resolution_y" field not available');
			return false;
		}

		// resolutions have to be integer values
		var resX = this.object['resolution_x'];
		var resY = this.object['resolution_y'];

		if(isInt(resX) && isInt(resY)) {
			return true;
		} 

		this.validationErrors.push('"resolution_x" or "resolution_y" field values are not integers');
		return false;
	}

	/**
	 * validates slids in the project JSON
	 * @returns {boolean}
	 */
	validateSlides() {
		// slides should be available in JSON
		if(!this.hasField('slides')) {
			this.validationErrors.push('"slides" field not available');
			return false;
		}

		this.validateSlideIds();

		var slides = this.object['slides'];
		var slideIds = Object.keys(this.object['slides']);
		
		// there should be atleast one slide in the project
		if(slideIds.length === 0) {
			return false;
		}

		// check each slide
		for(var i=0; i<slideIds.length; i++) {
			var slide = slides[slideIds[i]];
			if(!this.validateSlide(slide)) {
				this.validationErrors.push('"resolution_x" field not available');
				return false;
			}
		}

		return true;
	}

	/**
	 * validates that the slide Id's
	 * @returns {boolean} true if 
	 * 		value represents an array
	 * 		array is not empty
	 * 		elements of the array should be integers >= 0
	 */
	validateSlideIds() {

		// assumes that "slides" field exists in the JSON
		// hence does not check for it
		var slideIds = Object.keys(this.object['slides']);

		// slideIds should not be empty
		if(slideIds.length === 0) {
			this.validationErrors.push('"slides" field array is empty');
			return false;
		}

		// slide Id's should be integers greater than or equal to 0
		for(var i=0; i<slideIds.length; i++) {
			if((!isInt(slideIds[i])) || (parseInt(slideIds[i]) < 0)) {
				this.validationErrors.push('"slide" field id : ' + slideIds[i] + ' is invalid');
				return false;
			}
		} return true;
	}

	/**
	 * validates that the slide objet
	 *
	 * {
	 *		layering_objects: [...],
	 * 		hyperlink: ...,
	 * 		type: ...,
	 * 		urls: {
	 * 			audio_url: ...,
	 * 			image_url: ...,
	 * 			video_url: ...,
	 * 			question_url: ...
	 * 		}
	 * }
	 *
	 * @param {Object} slideObject
	 * @returns {boolean} true if valid JSON schema
	 */
	validateSlide(slideObject) {

		if(!(
			this.validateSlideLayeringObjects(slideObject) && 
			this.validateSlideHyperlink(slideObject) && 
			this.validateSlideType(slideObject) && 
			this.validateSlideUrls(slideObject)
		)) {
			return false;
		} 

		// TODO: 
		// if type is question, then validate the question JSON

		return true;
		
	}

	/**
	 * validates the "layering_objects" field
	 * @returns {boolean} true if value is an array
	 */
	validateSlideLayeringObjects(slideObject) {
		var layeringObjects = slideObject['layering_objects'];

		if(
			(!layeringObjects) ||
			((layeringObjects).constructor !== Array)) 
		{
			return false;
		}

		// TODO
		// implement validation logic for each layering object
		return true;
	}

	/**
	 * validates the "hyperlink" field
	 * @returns {boolean | null} true if
	 * 		value is null or
	 * 		value is an ID to another slide
	 */
	validateSlideHyperlink(slideObject) {
		var hyperlink = slideObject['hyperlink'];
		if(!hyperlink) {
			return false;
		}

		if(hyperlink === null) {
			return true;
		}

		// TODO 
		// check if hyperlinked slide exists
		return true;
	}

	/**
	 * validates the "type" field
	 * @returns {boolean | null} true if
	 * 		value is either "image" or "video" or "question"
	 */
	validateSlideType(slideObject) {
		var type = slideObject['type'];
		if(!type) {
			return false;
		}

		for(var i=0; i<VALID_SLIDE_TYPES.length; i++) {
			if(VALID_SLIDE_TYPES[i] === type) {
				break;
			}
		}
		if(i === VALID_SLIDE_TYPES.length) {
			return false;
		}

		return true;
	}

	/**
	 * validates the "urls" field
	 *
	 * {
	 * 		...,
	 * 		"urls": {
	 * 			"audio_url": ...,
	 * 			"image_url": ...,
	 * 			"video_url": ...,
	 *			"question_url": ...
	 * 		}
	 * }
	 *
	 * @returns {boolean | null} true if
	 * 		the value confirms the the JSON schema above
	 */
	validateSlideUrls(slideObject) {
		var urls = slideObject['urls'];
		if(!urls) {
			return false;
		}

		// check if all four and only these four url's exist
		var keys = Object.keys(urls);
		keys.sort();

		if(keys.length !== SLIDE_URL_KEYS.length) {
			return false;
		}

		for(var i=0; i<SLIDE_URL_KEYS.length; i++) {
			if(keys[i] !== SLIDE_URL_KEYS[i]) {
				return false;
			}
		}

		// TODO
		// check each of the urls exist
		return true;
	}

	validateSlideOrderingSequence() {

		if(!this.validateSlides()) {
			return false;
		}

		var slideOrderingSequence = this.object['slide_ordering_sequence'];
		var slideIds = Object.keys(this.object['slides']);

		// check if array
		if((!slideOrderingSequence) || (slideOrderingSequence.constructor !== Array)) {
			return false;
		}

		// check if all elements of slideOrderingSequence are integers
		for(var i=0; i<slideOrderingSequence.length; i++) {
			if(!isInt(slideOrderingSequence[i])) {
				return false;
			}
		}

		// sort before element wise comparison
		slideOrderingSequence.sort();
		slideIds.sort();

		// element wise comparison
		for(var i=0; i<slideOrderingSequence.length; i++) {
			if(slideOrderingSequence[i] !== slideIds[i]) {
				return false;
			}
		} 

		return true;
	}

}

class questionJsonObject extends jsonObject {
	/**
	 * validates whether the json represents a valid question object
	 *
	 * {
	 * 		type: ...,
	 * 		is_compulsary: ...,
	 * 		question_string: ...,
	 * 		options: [...],
	 * 		answers: [...],
	 * 		hints: [...],
	 * 		solution: ...
	 * }
	 *
	 * @param {String} jsonString - string supposed to represent question JSON
	 * @return {boolean} true if jsonString represents a valid question JSON
	 */
	 validate() {
	 	return true;
	 }

}

class userJsonObject extends jsonObject {
	/**
	 * validates whether the json represents a valid user JSON
	 * @param {String} jsonString - string supposed to represent project JSON
	 * @return {boolean} true if jsonString represents a valid project JSON
	 */
	validate() {
		return true;
	}
}

class appJsonObject extends jsonObject {
	/**
	 * validates whether the json represents a valid app JSON
	 * @param {String} jsonString - string supposed to represent project JSON
	 * @return {boolean} true if jsonString represents a valid project JSON
	 */
	 validate() {
		return true;
	 }
}



module.exports = {
	jsonObject,
	projectJsonObject
}