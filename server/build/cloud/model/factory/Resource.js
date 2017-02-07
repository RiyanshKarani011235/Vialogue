'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * {
 *      id {string} : ...,
 *      audio_id {string} : ...,
 *      type {string}: Image | Video | Question | Audio,
 *      url {string} : ...,
 *      is_edited {boolean} : ...
 * }
 */

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

var _audioId = new WeakMap();
var _type = new WeakMap();
var _url = new WeakMap();
var _isEdited = new WeakMap();

var ID_FIELD;
var AUDIO_ID_FIELD;
var TYPE_FIELD;
var URL_FIELD;
var IS_EDITED_FIELD;
var CLASS_NAME;

var ParseClass = require('./interfaces/ParseClass.js');

var Resource = (_dec = _flowRuntime2.default.annotate(_flowRuntime2.default.class('Resource', _flowRuntime2.default.method('constructor', _flowRuntime2.default.param('type', _flowRuntime2.default.string()), _flowRuntime2.default.param('parameter', _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('Parse'))), _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('constructorFromParseObject', _flowRuntime2.default.param('parseObject', _flowRuntime2.default.ref('Parse')), _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('constructorFromJsonString', _flowRuntime2.default.param('jsonString', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('parseJson', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('validateId', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('validateAudioId', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('validateUrl', _flowRuntime2.default.param('URL_FIELD', _flowRuntime2.default.any()), _flowRuntime2.default.param('CLASS_NAME', _flowRuntime2.default.any()), _flowRuntime2.default.return(_flowRuntime2.default.any())), _flowRuntime2.default.method('validateType', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('validateUrl', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.method('validateIsEdited', _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise))), _flowRuntime2.default.extends(ParseClass))), _dec(_class = function (_ParseClass) {
    _inherits(Resource, _ParseClass);

    function Resource(type, parameter) {
        var _this, _ret;

        _classCallCheck(this, Resource);

        var _typeType = _flowRuntime2.default.string();

        var _parameterType = _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('Parse'));

        var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

        _flowRuntime2.default.param('type', _typeType).assert(type);

        _flowRuntime2.default.param('parameter', _parameterType).assert(parameter);

        // determine resource type
        var config;
        if (type === ParseClass.imageConfig.CLASS_NAME) {
            congif = ParseClass.imageConfig;
        } else if (type === ParseClass.videoConfig.CLASS_NAME) {
            config = ParseClass.videoConfig;
        } else if (type === ParseClass.questionConfig.CLASS_NAME) {
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
        return _ret = _returnType.assert((_this = _possibleConstructorReturn(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).call(this, CLASS_NAME, parameter)), _this)), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Resource, [{
        key: 'constructorFromParseObject',
        value: function constructorFromParseObject(parseObject) {
            var _this2 = this;

            var _parseObjectType = _flowRuntime2.default.ref('Parse');

            var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            _flowRuntime2.default.param('parseObject', _parseObjectType).assert(parseObject);

            return _returnType2.assert(new Promise(function (fulfill, reject) {

                try {
                    _this2.id = parseObject.get(ID_FIELD);
                    _audioId.set(_this2, parseObject.get(AUDIO_ID_FIELD));
                    _type.set(_this2, parseObject.get(TYPE_FIELD));
                    _url.set(_this2, parseObject.get(URL_FIELD));
                    _isEdited.set(_this2, parseObject.get(IS_EDITED_FIELD));
                    fulfill(_this2);
                } catch (error) {
                    reject(error);
                }
            }));
        }
    }, {
        key: 'constructorFromJsonString',
        value: function constructorFromJsonString(jsonString) {
            var _this3 = this;

            var _jsonStringType = _flowRuntime2.default.string();

            var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            _flowRuntime2.default.param('jsonString', _jsonStringType).assert(jsonString);

            this.jsonString = jsonString;
            this.object = JsonUtils.tryParseJSON(jsonString) || null;

            if (this.object === null) {
                // json string not valid
                return _returnType3.assert(new Promise(function (fulfill, reject) {
                    reject(ErrorUtils.NOT_VALID_JSON_ERROR());
                }));
            }

            return _returnType3.assert(new Promise(function (fulfill, reject) {
                _this3.parseJson().then(function () {
                    // return initialized object
                    fulfill(_this3);
                }, function (error) {
                    reject(error);
                });
            }));
        }
    }, {
        key: 'parseJson',
        value: function parseJson() {
            var _this4 = this;

            var _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType4.assert(new Promise(function (fulfill, reject) {
                _this4.validateId().then(function () {
                    return _this4.validateAudioId();
                }).then(function () {
                    return _this4.validateType();
                }).then(function () {
                    return _this4.validateUrl();
                }).then(function () {
                    return _this4.validateIsEdited();
                }).then(function () {
                    fulfill(_this4);
                }).catch(function (error) {
                    reject(Error(error));
                });
            }));
        }
    }, {
        key: 'validateId',
        value: function validateId() {
            var _this5 = this;

            var _returnType5 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType5.assert(new Promise(function (fulfill, reject) {
                _this5.validateIdField(ID_FIELD, CLASS_NAME).then(function () {
                    _this5.id = _this5.object[ID_FIELD];
                    fulfill();
                }, function (error) {
                    console.log(error);
                    reject(error);
                });
            }));
        }
    }, {
        key: 'validateAudioId',
        value: function validateAudioId() {
            var _this6 = this;

            var _returnType6 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType6.assert(new Promise(function (fulfill, reject) {

                _this6.validateIdField(ParseClass.audioConfig.ID_FIELD, ParseClass.audioConfig.CLASS_NAME).then(function (result) {
                    // TODO continue from here
                });
            }));
        }
    }, {
        key: 'validateUrl',
        value: function validateUrl(URL_FIELD, CLASS_NAME) {
            var _this7 = this;

            return new Promise(function (fulfill, reject) {

                var url = _this7.object[fieldName];

                // no such field
                if (url === undefined) {
                    reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(fieldName, className));
                }

                // if not string, then invalid
                if (!validate.isString(url)) {
                    reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(fieldName, className, typeof url === 'undefined' ? 'undefined' : _typeof(url), 'String'));
                }

                // TODO: check if the URL is actually validate
                fulfill(url);
            });
        }
    }, {
        key: 'validateType',
        value: function validateType() {
            var _this8 = this;

            var _returnType7 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType7.assert(new Promise(function (fulfill, reject) {

                var type = _this8.object[TYPE_FIELD];

                // no such field
                if (type === undefined) {
                    reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(TYPE_FIELD, CLASS_NAME));
                }

                // if not a string, reject
                if (!validate.isString(type)) {
                    reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(TYPE_FIELD, CLASS_NAME, typeof type === 'undefined' ? 'undefined' : _typeof(type), 'String'));
                }

                // if value is not "CLASS_NAME", reject
                if (type !== CLASS_NAME) {
                    reject(ErrorUtils.NOT_VALID_VALUE_ERROR(TYPE_FIELD, CLASS_NAME, [CLASS_NAME]));
                }

                _type.set(_this8, type);
                fulfill();
            }));
        }
    }, {
        key: 'validateUrl',
        value: function validateUrl() {
            var _this9 = this;

            var _returnType8 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType8.assert(new Promise(function (fulfill, reject) {

                _get(Resource.prototype.__proto__ || Object.getPrototypeOf(Resource.prototype), 'validateUrl', _this9).call(_this9, URL_FIELD, CLASS_NAME).then(function (result) {
                    _url.set(_this9, result);
                    fulfill();
                }, function (error) {
                    reject(error);
                });
            }));
        }
    }, {
        key: 'validateIsEdited',
        value: function validateIsEdited() {
            var _this10 = this;

            var _returnType9 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Promise));

            return _returnType9.assert(new Promise(function (fulfill, reject) {

                var isEdited = _this10.object[IS_EDITED_FIELD];

                // no such field
                if (isEdited === undefined) {
                    reject(ErrorUtils.FIELD_NOT_PRESENT_ERROR(IS_EDITED_FIELD, CLASS_NAME));
                }

                // not a boolean, invalid
                if (!validate.isBoolean(isEdited)) {
                    reject(ErrorUtils.TYPE_NOT_CORRECT_ERROR(IS_EDITED_FIELD, CLASS_NAME, typeof isEdited === 'undefined' ? 'undefined' : _typeof(isEdited), 'boolean'));
                }

                _isEdited.set(_this10, isEdited);
                fulfill();
            }));
        }
    }]);

    return Resource;
}(ParseClass)) || _class);


module.exports = {
    Resource: Resource
};