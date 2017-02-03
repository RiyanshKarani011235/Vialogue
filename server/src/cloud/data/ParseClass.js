// imports
var fs = require('fs');
var validate = require('validate.js');
var errorUtils = require('./errorUtils.js');
var jsonUtils = require('../utils/jsonUtils.js');

// read and validate configuration files
const projectConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/projectConfig.json')) || (() => {throw 'projectConfig.json is corrupted'})();
const slideConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/slideConfig.json')) || (() => {throw 'slideConfig.json is corrupted'})();
const imageConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/imageConfig.json')) || (() => {throw 'imageConfig.json is corrupted'})();
const videoConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/videoConfig.json')) || (() => {throw 'videoConfig.json is corrupted'})();
const questionConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/videoConfig.json')) || (() => {throw 'questionConfig.json is corrupted'})();
const audioConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/audioConfig.json')) || (() => {throw 'audioConfig.json is corrupted'})();
const categoryConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/categoryConfig.json')) || (() => {throw 'categoryConfig.json is corrupted'})();
const languageConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/languageConfig.json')) || (() => {throw 'languageConfig.json is corrupted'})();
const userConfig = jsonUtils.tryParseJSON(fs.readFileSync('./config/userConfig.json')) || (() => {throw 'userConfig.json is corrupted'})();

/**
 * This class is an interface that, that defines provides some methods that
 * are commonly used by all the Parse Classes that are implemented in this
 * project, and also defines some constraints that need to be implemented by
 * any class that extends this class.
 *
 * Since this class is meant to be used as an interface, and not a class by
 * regular standards, any class that extends this class has to implemente then
 * following methods :
 *
 *      constructorFromParseObject :
 *          TODO: write the description of this method
 *          This method is supposed to initialize ...
 *          @param {ParseObject} parseObject
 *          @return {Promise} : fulfilled if initialization is successfull, or else rejected
 *
 *      constructorFromJsonString :
 *          TODO: write the description of this method
 *          @param {String} jsonString : a JSON string that ...
 *          TODO: write this too
 *
 * 		TODO write
 *		constructor() {
 *	 		super(CLASS_NAME, parameter);
 *		}
 *
 * This class implements the following methods :
 * 		TODO write
 * 		validateIdField
 *
 * This class also defines the following parameters
 * 		className
 *
 */
class ParseClass extends Parse.Object {

    /**
	 * @param {String} className : the class name of the Parse Object in the database
	 * @param {String} jsonString : JSON To parse
	 * OR
	 * @param {Project} projectParseObject : already generated Project {ParseObject} instance
	 *
	 * @return {Promise} :
	 * 		fulfilled iff
	 * 			no validation requested or
	 * 			validation successfull
	 * 		rejected if
	 * 			number of arguments not equal 1 or 2
	 * 			arguments don't match required argument types
	 * 			validation errors
	 * @throws
	 * 			errorUtils.CONSTRUCTOR_INVALID_ARGUMENTS_ERROR : if incorrect arguments passed
	 * 			errorUtils.INTERFACE_NOT_IMPLEMENTED_ERROR : if all the methods of the interface
	 *	 			have note been implemented
	 */
	constructor(className, parameter) {

		// validate arguments
		if(
			(!validate.isString(className)) ||
			(!(validate.isString(parameter) || (parameter.className === className)))
		) {
		  	throw errorUtils.CONSTRUCTOR_INVALID_ARGUMENTS_ERROR(arguments);
		}

		// pass the classname to Parse.Object constructor
		super(className);

		// validate the implementation of the interface :

		// constructorFromParseObject
		if (!this.constructorFromParseObject) {
			throw errorUtils.INTERFACE_NOT_IMPLEMENTED_ERROR('ParseClass', 'constructorFromParseObject');
		}

		// constructorFromJsonString
		if (!this.constructorFromJsonString) {
			throw errorUtils.INTERFACE_NOT_IMPLEMENTED_ERROR('ParseClass', 'constructorFromJsonString');
		}

		if(validate.isString(parameter)) {
			// generate Project instance from a given json string
			return this.constructorFromJsonString(parameter);
		} else {
			// generate instance from a given Parse Object
			return this.constructorFromParseObject(parameter);
		}
	}

	/**
	 * @param {String} fieldName : id field in the JSON String, to be validated
	 * @param {String} className : Parse Class name pertaining to the saved Parse Object,
	 * 							   whose id is the value to this field
	 * @return {Promise} :
	 * 		fulfilled iff fieldName field exists in the JSON and
	 * 			value is null or
	 * 			value is String and corresponds to a parse object in the "className" class of
	 * 			in the database
	 * 		rejected otherwise, returning the error message
	 */
	validateIdField(fieldName, className) {
		return new Promise((fulfill, reject) => {

			var id = this.object[fieldName];

			// no such field
			if(id === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(fieldName, className));
			}

			// if null, then valid
			if(id === null) {
				this.id = id;
				fulfill();
			}

			// if type is not String, then invalid
			if(!validate.isString(id)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(fieldName, className, typeof(id), 'String'));
			}

			// if object does not exist in the database, then invalid
			var obj = Parse.Object.extend(className);
			var query = new Parse.Query(obj);
			query.get(id).then(
				(result) => {
					fulfill(result);
				}, (error) => {
					if(error.code === 101) {
						// object with id "id" not found
						reject(errorUtils.PARSE_OBJECT_NOT_FOUND_ERROR(id, className));
					} else {
						reject(Error(error));
					}
				}
			);

		});

	}


}

module.exports = {
    ParseClass,
    projectConfig,
    slideConfig,
    imageConfig,
    videoConfig,
    questionConfig,
    audioConfig,
    categoryConfig,
    languageConfig,
    userConfig
}
