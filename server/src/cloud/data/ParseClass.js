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
 *      getParseClassParams :
 *          TODO: write the description of this method
 *          @return {Object} : consisting of key : value pairs of parameters that need to be
 *              saved to the database, for the particular Parse.Object
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
 */
class ParseClass extends Parse.Object {

    /**
	 * @param {String} jsonString : JSON to parse
	 * @param {boolean} initialize : if set to false, then the Project object returned will be empty
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
	 */
	constructor(/* jsonString, initialize=true | projectparseObject */) {
        // pass the classname to Parse.Object constructor
        super(projectConfig.CLASS_NAME);

		// TODO: after the development is done, remove the initialize option, because
		// this class is useless if not initialized, and it makes not sense keeping
		// it here

        // check if this interface is implemented correctly :

        // constructorFromParseObject
        if (!this.constructorFromParseObject) {
            throw errorUtils.INTERFACE_NOT_IMPLEMENTED_ERROR('ParseClass', 'constructorFromParseObject');
        }

        // constructorFromJsonString
        if (!this.constructorFromJsonString) {
            throw errorUtils.INTERFACE_NOT_IMPLEMENTED_ERROR('ParseClass', 'constructorFromJsonString');
        }

        // Check if correct arguments have been passed
		if(arguments.length === 2) {
			if(validate.isString(arguments[0]) && validate.isBoolean(arguments[1])) {
				// generate Project instance from a given json string
				return this.constructorFromJsonString(arguments[0], arguments[1]);
			}
		} else if(arguments.length === 1) {
			if(validate.isString(arguments[0])) {
                // generate Project instance from a given json string
				return this.constructorFromJsonString(arguments[0]);
			} else if((arguments[0].constructor === ParseObjectSubclass) && (arguments[0].className === projectConfig.CLASS_NAME)) {
                // generate instance from a given Parse Object
				return this.constructorFromParseObject(arguments[0]);
			}
		} else {
			return new Promise((fulfill, reject) => {
				reject(errorUtils.CONSTRUCTOR_INVALID_ARGUMENTS_ERROR(arguments));
			});
		}
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
