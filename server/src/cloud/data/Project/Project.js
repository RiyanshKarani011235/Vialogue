var fs = require('fs');
var validate = require('validate.js');
var jsonUtils = require('../../json/jsonUtils.js');

var projectConfig = fs.readFileSync('./config/projectConfig.json');
var categoryConfig = fs.readFileSync('./config/categoryConfig.json');
var languageConfig = fs.readFileSync('./config/languageConfig.json');
var userConfig = fs.readFileSync('./config/userConfig.json');

// get configuration files
projectConfig = jsonUtils.tryParseJSON(projectConfig) || (() => {throw 'projectConfig.json is corrupted'})();
categoryConfig = jsonUtils.tryParseJSON(categoryConfig) || (() => {throw 'categoryConfig.json is corrupted'})();
languageConfig = jsonUtils.tryParseJSON(languageConfig) || (() => {throw 'languageConfig.json is corrupted'})();
userConfig = jsonUtils.tryParseJSON(userConfig) || (() => {throw 'userConfig.json is corrupted'})();

// Reject Error Strings 
var NOT_VALID_JSON_ERROR = function() {
	return Error('JSON schema not valid');
}
var FIELD_NOT_PRESENT_ERROR = function(id) {
	return Error('Could not find the following field in the JSON : \"' + id + '\"');
}
var TYPE_NOT_CORRECT_ERROR = function(id, foundType, expectedType) {
	return Error('Incorrect type found for value corresponding to field : \"' + id + 
		'\"\nExpected : \"' + expectedType + '\" but found : \"' + foundType + '\"');
}
var PARSE_OBJECT_NOT_FOUND_ERROR = function(id, className) {
	return Error('Parse Object with id : \"' + id + '\" for Class : \"' + className + '\" not found');
}

class Project extends Parse.Object{

	constructor(jsonString, initialize=true) {
		// pass the classname to Parse.Object constructor
		super(projectConfig.CLASS_NAME);

		if(!initialize) {
			console.log('Project : constructor : not initializing');
			return;
		}

		this.jsonString = jsonString;
		this.object = jsonUtils.tryParseJSON(jsonString) || null;

		if(this.object === null) {
			// json string not valid
			return new Promise((fulfill, reject) => {
				reject(NOT_VALID_JSON_ERROR());
			});
		}

		var this_ = this;
		return new Promise((fulfill, reject) => {
			this_.parseJson().then(
				() => {
					// return the initialized object
					fulfill(this_);
				}, (error) => {
					reject(error);
				}
			);
		});
	}

	/**
	 * validates and parses this.jsonString
	 * 
	 * {
	 * 		id {String}: ...,
	 * 		parent {String}: ...,
	 * 		original_parent {String}: ...,
	 * 		name {String}: ...,
	 * 		is_dubbed {boolean}: ...,
	 * 		category {String}: ...,
	 * 		language {String}: ...,
	 * 		author {String}: ...,
	 * 		resolution_x {int}: ...,
	 * 		resolution_y {int}: ...,
	 * 		slide_ordering_sequence {int Array}: [...],
	 * 		slides: [
	 * 			{
	 * 				id {String}: ...,
	 * 				project_slide_id {int}: ...,
	 * 				layering_objects {String Array}: [...],
	 * 				hyperlink {String}: ...,
	 * 				type {String}: ...,
	 * 				urls: {
	 * 					audio_url {String}: ...,
	 * 					image_url {String}: ...,
	 * 					video_url {String}: ...,
	 * 					question_url {String}: ...
	 * 				}
	 * 			}, 
	 * 			...
	 * 		]
	 * }
	 *
	 * @returns {Promise} : 
	 * 		fulfilled iff the JSON schema is correct (as per the above schema)
	 * 		rejected if any errors caught or schema invalid
	 */
	parseJson() {
		return new Promise((fulfill, reject) => {
			this.validateId().then(() => {
				return this.validateParentId();
			}).then(() => {
				return this.validateOriginalParentId();
			}).then(() => {
				return this.validateCategoryId();
			}).then(() => {
				return this.validateLanguageId();
			}).then(() => {
				return this.validateAuthorId();
			}).then(() => {
				return this.validateName();
			}).then(() => {
				return this.validateIsDubbed();
			}).then(() => {
				return this.validateResolutionX();
			}).then(() => {
				return this.validateResolutionY();
			}).then(() => {
				return this.validateSlideOrderingSequence();
			}).then(() => {
				return this.validateSlides();
			}).then(res=> {
				fulfill(this);
			}).catch((error) => {
				reject(Error(error));
			});
		});
	}

	/**
	 * @param {String} fieldName : id field to be validated
	 * @param {String} className : Parse Class name pertaining to the saved Parse Object, 
	 * 							   whose id is the value to this field
	 * @param {String} instanceVariableName : the name of instance variable of this class
	 * 							   to which the fetched Parse Object (if exists) is assigned
	 * @param {boolean} saveReferencedParseObject : if true, the fetched Parse Object is saved
	 * 							   assigning it to the instanceVariable
	 * @return {boolean} true if
	 *		fieldName field exists in the JSON and
	 * 			value is null or
	 * 			value is String and corresponsd to a parse object in the "className" class of
	 * 			in the database
	 */
	validateIdField(fieldName, className, instanceVariableName, saveReferencedParseObject=true) {
		return new Promise((fulfill, reject) => {

			var id = this.object[fieldName];

			// no such field
			if(id === undefined) {
				reject(FIELD_NOT_PRESENT_ERROR(fieldName));
			}

			// if null, then valid
			if(id === null) {
				this.id = id;
				fulfill();
			}

			// if type is not String, then invalid
			if(typeof (id) !== 'string') {
				reject(TYPE_NOT_CORRECT_ERROR(fieldName, typeof(id), 'String'));
			}

			// if object does not exist in the database, then invalid
			var obj = Parse.Object.extend(className);
			var query = new Parse.Query(obj);

			query.get(id).then(
				(result) => {
					// add instance variable (this.instanceVariableName = id)
					if(saveReferencedParseObject) {
						eval('this.' + instanceVariableName + ' = result');

						// var str = 'Object.defineProperty(this, \"' + instanceVariable + '\", ' + 
						// 	'{get: () => {return this.__' + instanceVariableName + '}, ' + 
						// 	'{set: () => {return ' + 'Error(' + CANNOT_SET_OBJECT_PROPERTY_ERROR.message + ')}}';
						// console.log(str);
						// eval(str);
					}
					fulfill();
				}, (error) => {
					if(error.code === 101) {
						// object with id "id" not found
						reject(PARSE_OBJECT_NOT_FOUND_ERROR(id, className));
					} else {
						reject(Error(error));
					}
				}
			);

		});

	}

	validateId() {
		var this_ = this;
		return new Promise((fulfill, reject) => {
			this_.validateIdField(projectConfig.ID_FIELD, projectConfig.CLASS_NAME, 'id', false).then(
				() => {
					this_.id = this_.object[projectConfig.ID_FIELD];
					fulfill();
				}, (error) => {
					reject(error);
				}
			);

		});
	}

	validateParentId() {
		return this.validateIdField(projectConfig.PARENT_FIELD, projectConfig.CLASS_NAME, projectConfig.PARENT_FIELD); // ADD __ before every name
	}

	validateOriginalParentId() {
		return this.validateIdField(projectConfig.ORIGINAL_PARENT_FIELD, projectConfig.CLASS_NAME, projectConfig.ORIGINAL_PARENT_FIELD);
	}

	validateCategoryId() {
		return this.validateIdField(projectConfig.CATEGORY_FIELD, categoryConfig.CLASS_NAME, projectConfig.CATEGORY_FIELD);
	}

	validateLanguageId() {
		return this.validateIdField(projectConfig.LANGUAGE_FIELD, languageConfig.CLASS_NAME, projectConfig.LANGUAGE_FIELD);
	}

	validateAuthorId() {
		return this.validateIdField(projectConfig.AUTHOR_FIELD, userConfig.CLASS_NAME, projectConfig.AUTHOR_FIELD);
	}

	validateName() {
		return new Promise((fulfill, reject) => {

			var name = this.object[projectConfig.NAME_FIELD];

			// no such field
			if(name === undefined) {
				reject(FIELD_NOT_PRESENT_ERROR(projectConfig.NAME_FIELD));
			}

			// if not string, invalid
			if(!validate.isString(name)) {
				reject(TYPE_NOT_CORRECT_ERROR(projectConfig.NAME_FIELD, typeof(name), 'String'));
			} 

			// TODO: CHECK FOR SPECIAL CHARACTERS IN THE STRING
			// use validate.js and RegEx for doing this

			this.name = name;
			fulfill();

		});
	}

	validateIsDubbed() {

		return new Promise((fulfill, reject) => {

			var isDubbed = this.object[projectConfig.IS_DUBBED_FIELD];

			// no such field
			if(isDubbed === undefined) {
				reject(FIELD_NOT_PRESENT_ERROR(projectConfig.IS_DUBBED_FIELD));
			}

			// not a boolean, invalid
			if(!validate.isBoolean(isDubbed)) {
				reject(TYPE_NOT_CORRECT_ERROR(projectConfig.IS_DUBBED_FIELD, typeof(isDubbed), 'boolean'));
			}

			this.isDubbed = isDubbed;
			fulfill();

		});
		
	}

	validateResolution(resolutionField, instanceVariableName) {

		return new Promise((fulfill, reject) => {

			var resolution = this.object[resolutionField];

			// no such field
			if(resolution === undefined) {
				reject(FIELD_NOT_PRESENT_ERROR(resolutionField));
			}

			// if not integer, invalid
			if(!validate.isInteger(resolution)) {
				reject(TYPE_NOT_CORRECT_ERROR(resolutionField, typeof(resolution), 'boolean'));
			}

			// TODO: CHECK IF RESOLUTION IS VALID (i.e not negative, ...)
			eval('this.' + instanceVariableName + ' = resolution;');
			fulfill();

		});
	} 

	validateResolutionX() {
		return this.validateResolution(projectConfig.RESOLUTION_X_FIELD, 'resolutionX');
	}

	validateResolutionY() {
		return this.validateResolution(projectConfig.RESOLUTION_Y_FIELD, 'resolutionY');
	}

	validateSlideOrderingSequence() {
		return new Promise((fulfill, reject) => {

			var slideOrderingSequence = this.object[projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD];
	
			// no such field
			if(slideOrderingSequence === undefined) {
				reject(FIELD_NOT_PRESENT_ERROR(projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD));
			}

			// if not array, invalid
			if(!validate.isArray(slideOrderingSequence)) {
				reject(TYPE_NOT_CORRECT_ERROR(projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD, typeof(slideOrderingSequence), 'Integer Array'));
			}

			// if any element is not an integer, then invalid
			for(var i=0; i<slideOrderingSequence.length; i++) {
				if(!validate.isInteger(slideOrderingSequence[i])) {
					reject(FIELD_NOT_PRESENT_ERROR(projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD));
				}
			}

			// TODO: check if all the corresponding slides present 
			this.slideOrderingSequence = slideOrderingSequence;
			fulfill();
		});
	}

	validateSlides() {
		return new Promise((fulfill, reject) => {
			// TODO: IMPLEMENT LOGIC
			fulfill();
		});
	}

	save() {
		this.set('id', this.id);
		this.set('parent', this.parent);
		this.set('original_parent', this.originalParent);
		this.set('name', this.name);
		this.set('is_dubbed', this.isDubbed);
		this.set('category', this.category);
		this.set('language', this.language);
		this.set('author', this.author);
		this.set('resolution_x', this.resolutionX);
		this.set('resolution_y', this.resolutionY);
		this.set('slide_ordering_sequence', this.slideOrderingSequence);
		return super.save();
	}

}

// when using extends, the SDK is not automatically aware of the subclass
Parse.Object.registerSubclass(projectConfig.CLASS_NAME, Project);

module.exports = {
	Project
}