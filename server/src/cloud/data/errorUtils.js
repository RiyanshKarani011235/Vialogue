// ParseClass.js
var INTERFACE_NOT_IMPLEMENTED_ERROR = function(interfaceName, functionNotFoundName) {
	return new Error('interface \"' + interfaceName +'\" not implemented correctly. Expected ' +
		'implementation of function \"' + functionNotFoundName + '\"'
	);
}

// Reject Error Strings
var NOT_VALID_JSON_ERROR = function() {
	return new Error('JSON schema not valid');
}
var FIELD_NOT_PRESENT_ERROR = function(id, className) {
	return new Error('Could not find the field : \"' + id + '\" in the JSON for \"' + className + '\" class');
}
var TYPE_NOT_CORRECT_ERROR = function(id, className, foundType, expectedType) {
	return new Error('Incorrect type found for value corresponding to field : \"' + id + '\" for Class : \"' + className + '\"' +
		' Expected : \"' + expectedType + '\" but found : \"' + foundType + '\"');
}
var PARSE_OBJECT_NOT_FOUND_ERROR = function(id, className) {
	return new Error('Parse Object with id : \"' + id + '\" for Class : \"' + className + '\" not found');
}

// Throw Error Strings
var CANNOT_SET_OBJECT_PROPERTY_ERROR = function(object, property) {
	return new Error('Property \"' + property + '\" of object \"' + object + '\" cannot be set');
}
var CONSTRUCTOR_INVALID_ARGUMENTS_ERROR = function(givenArguments) {
	var str = 'Invalid Arguments given to "ParseClass" constructor. ' +
		'Expected className, jsonString | parseObject. ' +
		'Given ';
	if(givenArguments.length === 0) {
		str += '[]';
	} else {
		for(var i=0; i<givenArguments.length; i++) {
			str += givenArguments[i] + ', ';
		}
	}
	return new Error(str);
}

module.exports = {
	// ParseClass
	INTERFACE_NOT_IMPLEMENTED_ERROR,

	// Project
    NOT_VALID_JSON_ERROR,
    FIELD_NOT_PRESENT_ERROR,
    TYPE_NOT_CORRECT_ERROR,
    PARSE_OBJECT_NOT_FOUND_ERROR,
    CANNOT_SET_OBJECT_PROPERTY_ERROR,
    CONSTRUCTOR_INVALID_ARGUMENTS_ERROR
}
