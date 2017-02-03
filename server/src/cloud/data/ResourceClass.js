// TODO: add documentation

var fs = require('fs');
var validate = require('validate.js');
var errorUtils = require('./errorUtils.js');
var jsonUtils = require('../utils/jsonUtils.js');

// read and validate configuration files
const resourceConfig = jsonUtils.tryParseJson(fs.readFileSync('./config/resourceConfig.json'));

/**
 * This class is a common class that defines a resource type
 */

class Resource extends ParseClass {

    constructor(className) {

    }
}
