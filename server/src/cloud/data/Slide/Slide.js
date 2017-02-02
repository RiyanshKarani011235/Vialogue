/**
 * {
 *      id {String}: ...,
 * 		project_slide_id {int}: ...,
 * 		layering_objects {String Array}: [...],
 * 		hyperlinks {String Array}: [...],
 * 		type {String}: ...,
 * 		resource {Image | Video | Question}: ...
 * }
 */

var fs = require('fs');
var validate = require('validate.js');
var jsonUtils = require('../../utils/jsonUtils.js');
var errorUtils = require('./errorUtils.js');
var ParseClass = require('../ParseClass.js')
var Image = require('../Image/Image.js');
var Video = require('../Video/Video.js');
var Question = require('../Question/Question.js');

// get configuration files
var projectConfig = fs.readFileSync('./config/projectConfig.json');
var categoryConfig = fs.readFileSync('./config/categoryConfig.json');
var languageConfig = fs.readFileSync('./config/languageConfig.json');
var userConfig = fs.readFileSync('./config/userConfig.json');

// validate configuration files
projectConfig = jsonUtils.tryParseJSON(projectConfig) || (() => {throw 'projectConfig.json is corrupted'})();
categoryConfig = jsonUtils.tryParseJSON(categoryConfig) || (() => {throw 'categoryConfig.json is corrupted'})();
languageConfig = jsonUtils.tryParseJSON(languageConfig) || (() => {throw 'languageConfig.json is corrupted'})();
userConfig = jsonUtils.tryParseJSON(userConfig) || (() => {throw 'userConfig.json is corrupted'})();

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

/**
 * A {ParseObject} that represents a row in the {Slide} class of the database
 *
 */

class Slide extends ParseClass.ParseClass {

}
