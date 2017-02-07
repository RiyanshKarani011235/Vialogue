// // TODO: add documentation
//
// var fs = require('fs');
// var validate = require('validate.js');
// var ParseClass = require('./ParseClass.js');
//
// var ErrorUtils = require('../../utils/ErrorUtils.js');
// var JsonUtils = require('../../utils/JsonUtils.js');
//
// /**
//  * This class is a common class that defines a resource type.
//  * Since this class is meant to be used as an interface, and not a class by
//  * regular standards, any class that extends this class has to implement all the
//  * methods required by the {ParseClass} class.
//  *
//  * This class implements the following methods
//  *
//  *      TODO write comments
//  *      validateUrl
//  */
//
// class Resource extends ParseClass.ParseClass {
//
//     constructor(className: string, paramter: string | Resource) {
//
//         super(className, paramter);
//
//     }
//
//     validateUrl(fieldName: string, className: string) {
//         return new Promise((fulfill, reject) => {
//
//             var url = this.object[fieldName];
//
//             // no such field
//             if(url === undefined) {
//                 reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(fieldName, className));
//             }
//
//             // if not string, then invalid
//             if(!validate.isString(url)) {
//                 reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(fieldName, className, typeof(url), 'String'));
//             }
//
//             // TODO: check if the URL is actually validate
//             fulfill(url);
//
//         });
//     }
//
// }
//
// module.exports = {
//     Resource
// }

/**
 * TODO: add documentation
 * {
 *      id {string}: ...,
 *      audio_id {string}: ...,
 *      type {string}: ...,
 *      url {string}: ...,
 *      is_edited {boolean}: ...
 * }
 */

var validate = require('validate.js');

var ParseClass = require('./interfaces/ParseClass.js');
var JsonUtils = require('../utils/JsonUtils.js');
var ErrorUtils = require('../utils/ErrorUtils.js');

const _audioId = new WeakMap();
const _type = new WeakMap();
const _url = new WeakMap();
const _isEdited = new WeakMap();

var ID_FIELD;
var AUDIO_ID_FIELD;
var TYPE_FIELD;
var URL_FIELD;
var IS_EDITED_FIELD;
var CLASS_NAME;

var ParseClass = require('./interfaces/ParseClass.js');

class Resource extends ParseClass {

    constructor(type: string, parameter: string | Parse.Object): Promise {

        // determine resource type
        var config;
        if(type === ParseClass.imageConfig.CLASS_NAME) {
            congif = ParseClass.imageConfig;
        } else if(type === ParseClass.videoConfig.CLASS_NAME) {
            config = ParseClass.videoConfig;
        } else if(type === ParseClass.questionConfig.CLASS_NAME) {
            config = ParseClass.questionConfig;
        } else {
            throw new Error('invalid resource type');
        }

        ID_FIELD = config.ID_FIELD;
        AUDIO_ID_FIELD = config.AUDIO_ID_FIELD;
        TYPE_FIELD = config.TYPE_FIELD;
        URL_FIELD = config.URL_FIELD;
        IS_EDITED_FIELD = config.IS_EDITED_FIELD;
        CLASS_NAME = config.CLASS_NAME;
        return super(CLASS_NAME, parameter);
    }

    constructorFromParseObject(parseObject: Parse.Object): Promise {

        return new Promise((fulfill, reject) => {

            try {
                this.id = parseObject.get(ID_FIELD);
                _audioId.set(this, parseObject.get(AUDIO_ID_FIELD));
                _type.set(this, parseObject.get(TYPE_FIELD));
                _url.set(this, parseObject.get(URL_FIELD));
                _isEdited.set(this, parseObject.get(IS_EDITED_FIELD));
                fulfill(this);
            } catch (error) {
                reject(error);
            }

        });

    }

    constructorFromJsonString(jsonString: string): Promise {
        this.jsonString = jsonString;
        this.object = JsonUtils.tryParseJSON(jsonString) || null;

        if(this.object === null) {
            // json string not valid
            return new Promise((fulfill, reject) => {
                reject(ErrorUtils.NOT_VALID_JSON_ERROR());
            });
        }

        return new Promise((fulfill, reject) => {
            this.parseJson().then(
                () => {
                    // return initialized object
                    fulfill(this);
                }, (error) => {
                    reject(error);
                }
            )

        });
    }

    parseJson(): Promise {
        return new Promise((fulfill, reject) => {
            this.validateId()
            .then(() => { return this.validateAudioId()})
            .then(() => { return this.validateType()})
            .then(() => { return this.validateUrl()})
            .then(() => { return this.validateIsEdited()})
            .then(() => { fulfill(this)})
            .catch((error) => { reject(Error(error))});
        });
    }

    validateId(): Promise {
        return new Promise((fulfill, reject) => {
            this.validateIdField(ID_FIELD, CLASS_NAME).then(
                () => {
                    this.id = this.object[ID_FIELD];
                    fulfill();
                }, (error) => {
                    console.log(error);
                    reject(error);
                }
            )

        });
    }

    validateAudioId(): Promise {
        return new Promise((fulfill, reject) => {

            this.validateIdField(ParseClass.audioConfig.ID_FIELD, ParseClass.audioConfig.CLASS_NAME).then(
                (result) => {
                    // TODO continue from here
                }
            )

        });
    }

    validateUrl(URL_FIELD, CLASS_NAME) {
        return new Promise((fulfill, reject) => {

            var url = this.object[fieldName];

            // no such field
            if(url === undefined) {
                reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(fieldName, className));
            }

            // if not string, then invalid
            if(!validate.isString(url)) {
                reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(fieldName, className, typeof(url), 'String'));
            }

            // TODO: check if the URL is actually validate
            fulfill(url);

        });
    }

    validateType(): Promise {
        return new Promise((fulfill, reject) => {

            var type = this.object[TYPE_FIELD];

            // no such field
            if(type === undefined) {
                reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(TYPE_FIELD, CLASS_NAME));
            }

            // if not a string, reject
            if(!validate.isString(type)) {
                reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(TYPE_FIELD, CLASS_NAME, typeof(type), 'String'));
            }

            // if value is not "CLASS_NAME", reject
            if(type !== CLASS_NAME) {
                reject(ErrorUtils.NOT_VALID_VALUE_ERROR(TYPE_FIELD, CLASS_NAME, [CLASS_NAME]));
            }

            _type.set(this, type);
            fulfill();

        });
    }

    validateUrl(): Promise {
        return new Promise((fulfill, reject) => {

            super.validateUrl(URL_FIELD, CLASS_NAME).then(
                (result) => {
                    _url.set(this, result);
                    fulfill();
                }, (error) => {
                    reject(error);
                }
            );

        });
    }

    validateIsEdited(): Promise {
		return new Promise((fulfill, reject) => {

			var isEdited = this.object[IS_EDITED_FIELD];

			// no such field
			if(isEdited === undefined) {
				reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(IS_EDITED_FIELD, CLASS_NAME));
			}

			// not a boolean, invalid
			if(!validate.isBoolean(isEdited)) {
				reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(IS_EDITED_FIELD, CLASS_NAME, typeof(isEdited), 'boolean'));
			}

			_isEdited.set(this, isEdited);
			fulfill();

		});
	}

}

module.exports = {
    Resource
}
