const validate = require('validate.js');

/**
 * CUSTOM validate.js validator
 * https://validatejs.org/#custom-validator
 */
validate.validators._isString = function(value, options, key, attributes) {
	if (options && value !== undefined) {
		if (validate.isString(value)) {
			return null;
		} else {
			return `has value ${value}  which is not a String`;
		}
	}
	return null;
};
validate.validators._isArray = function(value, options, key, attributes) {
	if (options && value !== undefined) {
		if (validate.isArray(value)) {
			return null;
		} else {
			return `has value ${value}  which is not a Array`;
		}
	}
	return null;
};
validate.validators._isNumber = function(value, options, key, attributes) {
	if (options && value !== undefined) {
		if (validate.isNumber(value)) {
			return null;
		} else {
			return `has value ${value}  which is not a Number`;
		}
	}
	return null;
};
validate.validators._isBoolean = function(value, options, key, attributes) {
	if (options && value !== undefined) {
		if (validate.isBoolean(value)) {
			return null;
		} else {
			return `has value ${value}  which is not a Boolean`;
		}
	}
	return null;
};
module.exports = validate;
