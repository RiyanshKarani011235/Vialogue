/**
 * This class {Project} represents a an extension of the {ParseObject}
 * class, which will be the highest level class in our database.
 * All other classes in the database will be directly or indirectly
 * referenced by this object.
 * The following JSON represents the schema of this {ParseObject}
 *
 * {
 * 		id {String}: ...,
 * 		parent {String}: ...,
 * 		original_parent {String}: ...,
 * 		name {String}: ...,
 * 		description {String}: ...,
 * 		tags {String Array}: [...],
 * 		is_dubbed {boolean}: ...,
 * 		category {String}: ...,
 * 		language {String}: ...,
 * 		author {String}: ...,
 * 		resolution_x {int}: ...,
 * 		resolution_y {int}: ...,
 * 		slide_ordering_sequence {int Array}: [...],
 * 		slides {Slide Array}: [...]
 * }
 */

// imports
var fs = require('fs');
var validate = require('validate.js');
var jsonUtils = require('../../utils/jsonUtils.js');
var errorUtils = require('../errorUtils.js');
var Slide = require('../Slide/Slide.js');
var ParseClass = require('../ParseClass.js');

/* private variables to this class are stored in the form of this WeakMaps
 * (where the key is the instance object "this", and the value is the value
 * of the variable). These can only be accessed through the getters and setters
 * in the Project class, and so we (as a programmer) can control how much can
 * another class access these variables
 */
const _parent = new WeakMap();
const _originalParent = new WeakMap();
const _category = new WeakMap();
const _language = new WeakMap();
const _author = new WeakMap();
const _name = new WeakMap();
const _description = new WeakMap(); // TODO
const _tabs = new WeakMap(); // TODO
const _isDubbed = new WeakMap();
const _resolutionX = new WeakMap();
const _resolutionY = new WeakMap();
const _slideOrderingSequence = new WeakMap();
const _slides = new WeakMap();

/**
 * A {ParseObject} that represents a row in the {Project} class of the database
 *
 * // TODO: if time persists, make methods private
 *
 * public methods
 * 		constructor
 * 		constructFromParseObject
 * 		constructFromJsonString
 * 		parseJson
 * 		validateIdField
 * 		validateId
 * 		validateParentId
 * 		validateOriginalParentId
 * 		validateCategoryId
 * 		validateLanguageId
 * 		validateAuthorId
 * 		validateName
 * 		validateDescription
 *		validateTags
 * 		validateIsDubbed
 * 		validateResolution
 * 		validateResolutionX
 * 		validateResolutionY
 * 		validateSlideOrderingSequence
 * 		validateSlides
 * 		save
 *
 * public attributes
 * 		id (gettable, settable)
 * 		parent (gettable)
 * 		originalParent (gettable)
 * 		name (gettable)
 *		description (gettable)
 * 		tags (gettable)
 * 		isDubbed (gettable)
 * 		category (gettable)
 * 		language (gettable)
 * 		author (gettable)
 * 		resolutionX (gettable)
 * 		resolutionY (gettable)
 * 		slideOrderingSequence (gettable) : consists "Slide.project_slide_id" values
 * 		slides (gettable)
 */
class Project extends ParseClass.ParseClass {

	//TODO: write a comment
	getParseClassParams() {

		var returnObject = {};

		returnObject[ParseClass.projectConfig.ID_FIELD] = this.id;
		returnObject[ParseClass.projectConfig.PARENT_FIELD] = this.parent;
		returnObject[ParseClass.projectConfig.ORIGINAL_PARENT_FIELD] = this.originalParent;
		returnObject[ParseClass.projectConfig.CATEGORY_FIELD] = this.category;
		returnObject[ParseClass.projectConfig.LANGUAGE_FIELD] = this.language;
		returnObject[ParseClass.projectConfig.AUTHOR_FIELD] = this.author;
		returnObject[ParseClass.projectConfig.NAME_FIELD] = this.name;
		returnObject[ParseClass.projectConfig.DESCRIPTION_FIELD] = this.description;
		returnObject[ParseClass.projectConfig.TAGS_FIELD] = this.tags;
		returnObject[ParseClass.projectConfig.IS_DUBBED_FIELD] = this.isDubbed;
		returnObject[ParseClass.projectConfig.RESOLUTION_X_FIELD] = this.resolutionX;
		returnObject[ParseClass.projectConfig.RESOLUTION_Y_FIELD] = this.resolutionY;
		returnObject[ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD] = this.slideOrderingSequence;
		returnObject[ParseClass.projectConfig.SLIDES_FIELD] = this.slides;

		return returnObject;
	}

	/**
	 * if ParseObject is provided as inpu,t + then we just have to
	 * read the required fields from the provided Object
	 */
	constructorFromParseObject(parseObject) {
		return new Promise((fulfill, reject) => {

			try {
				this.id = parseObject.get(ParseClass.projectConfig.ID_FIELD);
				_parent.set(this, parseObject.get(ParseClass.projectConfig.PARENT_FIELD));
				_originalParent.set(this, parseObject.get(ParseClass.projectConfig.ORIGINAL_PARENT_FIELD));
				_name.set(this, parseObject.get(ParseClass.projectConfig.NAME_FIELD));
				_description.set(this, parseObject.get(ParseClass.projectConfig.DESCRIPTION_FIELD));
				_tags.set(this, parseObject.get(ParseClass.projectConfig.TAGS_FIELD));
				_isDubbed.set(this, parseObject.get(ParseClass.projectConfig.IS_DUBBED_FIELD));
				_category.set(this, parseObject.get(ParseClass.projectConfig.CATEGORY_FIELD));
				_langauge.set(this, parseObject.get(ParseClass.projectConfig.LANGUAGE_FIELD));
				_author.set(this, parseObject.get(ParseClass.projectConfig.AUTHOR_FIELD));
				_resolutionX.set(this, parseObject.get(ParseClass.projectConfig.RESOLUTION_X_FIELD));
				_resolutionY.set(this, parseObject.get(ParseClass.projectConfig.RESOLUTION_Y_FIELD));
				_slideOrderingSequence.set(this, parseObject.get(ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD));
				_slides.set(this, parseObject.get(ParseClass.projectConfig.SLIDES_FIELD));
			} catch (error) {
				reject(error);
			}

		});
	}

	/**
	 * if JSON string is provided as input, then we will have to parse
	 * the JSON and generate a new ParseObject
	 */
	constructorFromJsonString(jsonString, initialize=true) {

		if(!initialize) {
			console.log('Project : constructFromJsonString : not initializing');
			return new Promise((fulfill, reject) => {
				fulfill(this);
			});
		} else {
			console.log('Project : constructorFromString : initializing');
		}

		this.jsonString = jsonString;
		this.object = jsonUtils.tryParseJSON(jsonString) || null;

		if(this.object === null) {
			// json string not valid
			return new Promise((fulfill, reject) => {
				reject(errorUtils.NOT_VALID_JSON_ERROR());
			});
		}

		return new Promise((fulfill, reject) => {
			this.parseJson().then(
				() => {
					// return the initialized object
					fulfill(this);
				}, (error) => {
					reject(error);
				}
			);
		});
	}

	/**
	 * validates and parses this.jsonString according to the expected JSON schema
	 * (look at the module description for the expected JSON schema)
	 *
	 * @return {Promise} :
	 * 		fulfilled iff the JSON schema is correct (as per the above schema), returning
	 * 			this Project instance, with all variables initialized according to the values
	 * 			in the JSON
	 * 		rejected if any errors caught or schema invalid, returning the error message
	 */
	parseJson() {
		return new Promise((fulfill, reject) => {
			this.validateId()
			.then(() => { return this.validateParentId()})
			.then(() => { return this.validateOriginalParentId()})
			.then(() => { return this.validateCategoryId()})
			.then(() => { return this.validateLanguageId()})
			.then(() => { return this.validateAuthorId()})
			.then(() => { return this.validateName()})
			.then(() => { return this.validateDescription()})
			.then(() => { return this.validateTags()})
			.then(() => { return this.validateIsDubbed()})
			.then(() => { return this.validateResolutionX()})
			.then(() => { return this.validateResolutionY()})
			.then(() => { return this.validateSlideOrderingSequence()})
			.then(() => { return this.validateSlides()})
			.then(() => { fulfill(this)})
			.catch((error) => {reject(Error(error))}
			);
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
	 * @return {Promise} :
	 * 		fulfilled iff fieldName field exists in the JSON and
	 * 			value is null or
	 * 			value is String and corresponds to a parse object in the "className" class of
	 * 			in the database
	 * 		rejected otherwise, returning the error message
	 */
	validateIdField(fieldName, className, instanceVariableName, saveReferencedParseObject=true) {

		// TODO: decide if "saveReferencedParseObject" is required
		return new Promise((fulfill, reject) => {

			var id = this.object[fieldName];

			// no such field
			if(id === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(fieldName));
			}

			// if null, then valid
			if(id === null) {
				this.id = id;
				fulfill();
			}

			// if type is not String, then invalid
			if(typeof (id) !== 'string') {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(fieldName, typeof(id), 'String'));
			}

			// if object does not exist in the database, then invalid
			var obj = Parse.Object.extend(className);
			var query = new Parse.Query(obj);

			query.get(id).then(
				(result) => {
					// add instance variable (this._instanceVariableName = id)
					if(saveReferencedParseObject) {
						// eval('this._' + instanceVariableName + ' = result');
						// eval('console.log(this._' + instanceVariableName + ')');

						// make the instanceVariable not settable
						// var str = 'Object.defineProperty(this, \"' + instanceVariableName + '\", ' +
						// 	'{get: () => {return this._' + instanceVariableName + '}, ' +
						// 	'set: () => {' +
						// 		'var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(\'' + ParseClass.projectConfig.CLASS_NAME + '\', \'' + instanceVariableName + '\');' +
						// 		'console.log(error);' +
						// 	'throw error}});';
						var str = '_' + instanceVariableName + '.set(this, result);';
						console.log('before eval ' + instanceVariableName);
						console.log(str);
						eval(str);
					}
					fulfill();
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

	/**
	 * validates the ParseClass.projectConfig.ID_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateId() {
		return new Promise((fulfill, reject) => {
			this.validateIdField(ParseClass.projectConfig.ID_FIELD, ParseClass.projectConfig.CLASS_NAME, 'id', false).then(
				() => {

					// CANNOT MAKE ID NOT SETTABLE BECAUSE WHEN USING THE ParseObject.set METHOD,
					// PARSE REASSIGNS THE ID FIELD.
					// FOR EVERY OTHER FIELD, PARSE CREATES A NEW ARRAY WITH KEY-VALUE PAIRS
					// TO BE SAVED / UPDATED IN THE DATABASE (WIERD!)

					this.id = this.object[ParseClass.projectConfig.ID_FIELD];
					fulfill();
				}, (error) => {
					reject(error);
				}
			);

		});
	}

	/**
	 * validates the ParseClass.projectConfig.PARENT_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateParentId() {
		return this.validateIdField(ParseClass.projectConfig.PARENT_FIELD, ParseClass.projectConfig.CLASS_NAME, 'parent');
	}

	/**
	 * validates the ParseClass.projectConfig.ORIGINAL_PARENT_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateOriginalParentId() {
		return this.validateIdField(ParseClass.projectConfig.ORIGINAL_PARENT_FIELD, ParseClass.projectConfig.CLASS_NAME, 'originalParent');
	}

	/**
	 * validates the ParseClass.projectConfig.CATEGORY_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateCategoryId() {
		return this.validateIdField(ParseClass.projectConfig.CATEGORY_FIELD, ParseClass.categoryConfig.CLASS_NAME, 'category');
	}

	/**
	 * validates the ParseClass.projectConfig.LANGUAGE_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateLanguageId() {
		return this.validateIdField(ParseClass.projectConfig.LANGUAGE_FIELD, ParseClass.languageConfig.CLASS_NAME, 'language');
	}

	/**
	 * validates the ParseClass.projectConfig.AUTHOR_FIELD field
	 * look at "validateIdField" method for description
	 */
	validateAuthorId() {
		return this.validateIdField(ParseClass.projectConfig.AUTHOR_FIELD, ParseClass.userConfig.CLASS_NAME, 'author');
	}

	/**
	 * validates the ParseClass.projectConfig.NAME_FIELD field
	 * @return {Promise} :
	 * 		fulfilled iff ParseClass.projectConfig.NAME_FIELD field exists in the JSON and
	 * 		value is String
	 * 		rejected otherwise, returning the error message
	 */
	validateName() {
		return new Promise((fulfill, reject) => {

			var name = this.object[ParseClass.projectConfig.NAME_FIELD];

			// no such field
			if(name === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.NAME_FIELD));
			}

			// if not string, invalid
			if(!validate.isString(name)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(ParseClass.projectConfig.NAME_FIELD, typeof(name), 'String'));
			}

			// TODO: CHECK FOR SPECIAL CHARACTERS IN THE STRING
			// use validate.js and RegEx for doing this

			_name.set(this, name);
			fulfill();

		});
	}

	validateDescription() {
		return new Promise((fulfill, reject) => {

			var description = this.object[ParseClass.projectConfig.DESCRIPTION_FIELD];

			// no such field
			if(description === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.DESCRIPTION_FIELD));
			}

			// if not string, invalid
			if(!validate.isString(description)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(ParseClass.projectConfig.DESCRIPTION_FIELD, typeof(description), 'String'));
			}

			// TODO: validate description length
			_description.set(this, name);
			fulfill();

		});
	}

	validateTags() {
		return new Promise((fulfill, reject) => {

			var tags = this.object[ParseClass.projectConfig.TAGS_FIELD];

			// no such field
			if(tags === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.TAGS_FIELD));
			}

			// if not array, invalid
			if(!validate.isArray(tags)) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.TAGS_FIELD), typeof(tags), 'Array');
			}

			// TODO: decide if tags should be Strings, or ParseObjects
			// if array elements not string, invalid
			for(var element in tags) {
				if(!validate.isString(element)) {
					reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.TAGS_FIELD), typeof(tags), 'StringArray');
				}
			}

			_tags.set(this, tags);
			fulfill();

		});
	}

	/**
	 * validates the ParseClass.projectConfig.IS_DUBBED_FIELD field
	 * @return {Promise} :
	 * 		fulfilled iff ParseClass.projectConfig.IS_DUBBED_FIELD field exists in the JSON and
	 * 		value is boolean
	 * 		rejected otherwise, returning the error message
	 */
	validateIsDubbed() {
		return new Promise((fulfill, reject) => {

			var isDubbed = this.object[ParseClass.projectConfig.IS_DUBBED_FIELD];

			// no such field
			if(isDubbed === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.IS_DUBBED_FIELD));
			}

			// not a boolean, invalid
			if(!validate.isBoolean(isDubbed)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(ParseClass.projectConfig.IS_DUBBED_FIELD, typeof(isDubbed), 'boolean'));
			}

			_isDubbed.set(this, isDubbed);
			fulfill();

		});

	}

	/**
	 * validates the ParseClass.projectConfig.RESOLUTION_*_FIELD fields
	 * @param {String} resolutionField : name of the field to be validated
	 * @param {String} instanceVariableName : the name of instance variable of this class
	 * 		to which the resolution value is assigned
	 *
	 * @return {Promise} :
	 * 		fulfilled iff resolutionField field exists in the JSON and
	 * 		value is integer
	 * 		rejected otherwise, returning the error message
	 */
	validateResolution(resolutionField, instanceVariableName) {
		return new Promise((fulfill, reject) => {

			var resolution = this.object[resolutionField];

			// no such field
			if(resolution === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(resolutionField));
			}

			// if not integer, invalid
			if(!validate.isInteger(resolution)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(resolutionField, typeof(resolution), 'boolean'));
			}

			// TODO: CHECK IF RESOLUTION IS VALID (i.e not negative, ...)

			// eval('this._' + instanceVariableName + ' = resolution;');
			//
			// var str = 'Object.defineProperty(this, \'' + instanceVariableName + '\', ' +
			// 	'{get: () => {return this._' + instanceVariableName + '}, ' +
			// 	'set: () => {' +
			// 		'var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(\'' + ParseClass.projectConfig.CLASS_NAME + '\', \'' + instanceVariableName + '\');' +
			// 		'console.log(error);' +
			// 	'throw error}});';

			var str = '_' + instanceVariableName + '.set(this, resolution)';
			eval(str);
			fulfill();

		});
	}

	/**
	 * validates the ParseClass.projectConfig.RESOLUTION_X field
	 * look at "validateResolution" method for description
	 */
	validateResolutionX() {
		return this.validateResolution(ParseClass.projectConfig.RESOLUTION_X_FIELD, 'resolutionX');
	}

	/**
	 * validates the ParseClass.projectConfig.RESOLUTION_Y field
	 * look at "validateResolution" method for description
	 */
	validateResolutionY() {
		return this.validateResolution(ParseClass.projectConfig.RESOLUTION_Y_FIELD, 'resolutionY');
	}

	/**
	 * validates the ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD field
	 * @return {Promise} :
	 * 		fulfilled iff ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD field exists in JSON and
	 * 		the value is an integer Array
	 * 		rejected otherwise, returning the error message
	 */
	validateSlideOrderingSequence() {
		return new Promise((fulfill, reject) => {

			var slideOrderingSequence = this.object[ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD];

			// no such field
			if(slideOrderingSequence === undefined) {
				reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD));
			}

			// if not array, invalid
			if(!validate.isArray(slideOrderingSequence)) {
				reject(errorUtils.TYPE_NOT_CORRECT_ERROR(ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD, typeof(slideOrderingSequence), 'Integer Array'));
			}

			// if any element is not an integer, then invalid
			for(var i=0; i<slideOrderingSequence.length; i++) {
				if(!validate.isInteger(slideOrderingSequence[i])) {
					reject(errorUtils.FIELD_NOT_PRESENT_ERROR(ParseClass.projectConfig.SLIDE_ORDERING_SEQUENCE_FIELD));
				}
			}

			// TODO: check if all the corresponding slides present

			_slideOrderingSequence.set(this, slideOrderingSequence);
			fulfill();
		});
	}

	validateSlides() {
		return new Promise((fulfill, reject) => {
			// TODO: IMPLEMENT LOGIC
			_slides.set(this, []);

			fulfill();
		});
	}

	/**
	 * saves the parse object to the databaes
	 * @return {Promise} fulfilled when object is saved successfully to the database
	 */
	save() {
		this.set('id', this.id);
		this.set('parent', this.parent);
		this.set('original_parent', this.originalParent);
		this.set('name', this.name);
		this.set('description', this.description);
		this.set('tags', this.tags);
		this.set('is_dubbed', this.isDubbed);
		this.set('category', this.category);
		this.set('language', this.language);
		this.set('author', this.author);
		this.set('resolution_x', this.resolutionX);
		this.set('resolution_y', this.resolutionY);
		this.set('slide_ordering_sequence', this.slideOrderingSequence);
		this.set('slides', this.slides); // TODO: test

		return super.save();
	}

	// getters and setters
	get parent() {
		return _parent.get(this);
	}

	get originalParent() {
		return _parent.get(this);
	}

	get category() {
		return _category.get(this);
	}

	get language() {
		return _language.get(this);
	}

	get author() {
		return _author.get(this);
	}

	get name() {
		return _name.get(this);
	}

	get description() {
		return _description.get(this);
	}

	get tags() {
		return _tags.get(this);
	}

	get isDubbed() {
		return _isDubbed.get(this);
	}

	get resolutionX() {
		return _resolutionX.get(this);
	}

	get resolutionY() {
		return _resolutionY.get(this);
	}

	get slideOrderingSequence() {
		return _slideOrderingSequence.get(this);
	}

	get slides() {
		return _slides.get(this);
	}

	set parent(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'parent');
		console.log(error);
		throw error;
	}

	set originalParent(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'originalParent');
		console.log(error);
		throw error;
	}

	set category(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'category');
		console.log(error);
		throw error;
	}

	set language(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'language');
		console.log(error);
		throw error;
	}

	set author(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'author');
		console.log(error);
		throw error;
	}

	set name(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'name');
		console.log(error);
		throw error;
	}

	set description(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'description');
		console.log(error);
		throw error;
	}

	set tags(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'tags');
		console.log(error);
		throw error;
	}

	set isDubbed(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'isDubbed');
		console.log(error);
		throw error;
	}

	set resolutionX(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'resolutionX');
		console.log(error);
		throw error;
	}

	set resolutionY(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'resolutionY');
		console.log(error);
		throw error;
	}

	set slideOrderingSequence(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'slideOrderingSequence');
		console.log(error);
		throw error;
	}

	set slides(val) {
		var error = errorUtils.CANNOT_SET_OBJECT_PROPERTY_ERROR(ParseClass.projectConfig.CLASS_NAME, 'slides');
		console.log(error);
		throw error;
	}
}

// when using extends, the SDK is not automatically aware of the subclass
// so have to do it manually
Parse.Object.registerSubclass(ParseClass.projectConfig.CLASS_NAME, Project);

module.exports = {
	Project
}
