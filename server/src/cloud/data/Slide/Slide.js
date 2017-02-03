/**
 * This class {Slide} represents an extension of the {ParseObject}.
 * The following JSON represents the schema of this {ParseObject}
 *
 * {
 *      id {String}: ...,
 * 		project_slide_id {int}: ...,
 * 		layering_objects {String Array}: [...],
 * 		hyperlinks {String Array}: [...],
 * 		type {String}: ...,
 * 		resource {Image | Video | Question}: ...,
 *      is_edited {boolean}: ...
 * }
 */

var fs = require('fs');
var validate = require('validate.js');
var jsonUtils = require('../../utils/jsonUtils.js');
var errorUtils = require('../errorUtils.js');
var ParseClass = require('../ParseClass.js')
var Image = require('../Image/Image.js');
var Video = require('../Video/Video.js');
var Question = require('../Question/Question.js');

/* private variables to this class are stored in the form of this WeakMaps
 * (where the key is the instance object "this", and the value is the value
 * of the variable). These can only be accessed through the getters and setters
 * in the Project class, and so we (as a programmer) can control how much can
 * another class access these variables
 */
const _projectSlideId = new WeakMap();
const _layeringObjects = new WeakMap();
const _hyperLinks = new WeakMap();
const _type = new WeakMap();
const _resource = new WeakMap();

const CLASS_NAME = ParseClass.slideConfig.CLASS_NAME;
const ID_FIELD = ParseClass.slideConfig.ID_FIELD;
const PROJECT_SLIDE_ID_FIELD = ParseClass.slideConfig.PROJECT_SLIDE_ID_FIELD;
const LAYERING_OBJECTS_FIELD = ParseClass.slideConfig.LAYERING_OBJECTS_FIELD;
const HYPERLINKS_FIELD = ParseClass.slideConfig.HYPERLINKS_FIELD;
const TYPE_FIELD = ParseClass.slideConfig.TYPE_FIELD;
const RESOURCE_FIELD = ParseClass.slideConfig.RESOURCE_FIELD;

/**
 * A {ParseObject} that represents a row in the {Slide} class of the database
 *
 */

class Slide extends ParseClass.ParseClass {

    constructor() {
        super(CLASS_NAME, arguments);
    }

    constructorFromParseObject(ParseObject) {
        return new Promise((fulfill, reject) => {

            try {
                this.id = ParseObject.get(ID_FIELD);
                _projectSlideId.set(this, ParseObject.get(PROJECT_SLIDE_ID_FIELD));
                _layeringObjects.set(this, ParseObject.get(LAYERING_OBJECTS_FIELD));
                _hyperLinks.set(this, ParseObject.get(HYPERLINKS_FIELD));
                _type.set(this, ParseObject.get(TYPE_FIELD));
                _resource.set(this, ParseObject.get(RESOURCE_FIELD));
            } catch (error) {
                reject(error);
            }

        });
    }

    constructorFromJsonString(jsonString, initialize=true) {
        if(!initialize) {
            console.log('Slide : constructFromJson : not initializing');
            return new Promise((fulfill, reject) => {
                fulfill(this);
            });
        } else {
            console.log('Slide : constructorFromJsonString : initializing');
        }

        this.jsonString = jsonString;
        this.object = jsonUtils.tryParseJson(jsonString) || null;

        if(this.object === null) {
            // json string not valid
            return new Promise((fulfill, reject) => {
                reject(errorUtils.NOT_VALID_JSON_ERROR());
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

    parseJson() {
        return new Promise((fulfill, reject) => {

            this.validateId()
            .then(() => { return this.validateProjectSlideId()})
            .then(() => { return this.validateLayeringObjects()})
            .then(() => { return this.validateHyperlinks()})
            .then(() => { return this.validateType()})
            .then(() => { return this.validateResource()})
            .then(() => { fulfill(this)})
            .catch((error) => {reject(Error(error))});
        });
    }

    /**
	 * validates the ID_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateId() {
		return new Promise((fulfill, reject) => {
			this.validateIdField(ID_FIELD, CLASS_NAME).then(
				() => {
					// CANNOT MAKE ID NOT SETTABLE BECAUSE WHEN USING THE ParseObject.set METHOD,
					// PARSE REASSIGNS THE ID FIELD.
					// FOR EVERY OTHER FIELD, PARSE CREATES A NEW ARRAY WITH KEY-VALUE PAIRS
					// TO BE SAVED / UPDATED IN THE DATABASE (WIERD!)

					this.id = this.object[ID_FIELD];
					fulfill();
				}, (error) => {
					reject(error);
				}
			);

		});
	}

    validateLayeringObjects() {
        return new Promise((fulfill, reject) => {
            // TODO: implement
            fulfill();
        });
    }

    validateHyperlinks() {
        return new new Promise(function(fulfill, reject) {

            var hyperlinks = this.object[ParseClass.HYPERLINKS_FIELD];

            // no such fieldName
            if(hyperlinks === undefined) {
                reject(errorUtils.FIELD_NOT_PRESENT_ERROR(HYPERLINKS_FIELD, CLASS_NAME));
            }

            // if not array, invalid
            if(!validate.isArray(hyperlinks)) {
                reject(errorUtils.TYPE_NOT_CORRECT_ERROR(HYPERLINKS_FIELD, CLASS_NAME, typeof(hyperlinks), 'Array'));
            }

        });
    }



}
