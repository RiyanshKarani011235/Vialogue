function isInt(value) {
	var x;
	// check if is a number
	if (isNaN(value)) {
		return false;
	}
	x = parseFloat(value);
	// bitwise operators convert operands to integers
	// hence, x | 0 works as Math.floor
	return (x | 0) === x;
}

// much cooler way of implementing the same function as above
function isInt(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function isString(value) {
	return typeof(value) === 'string';
}

function isBoolean(value) {
	return typeof(value) === 'boolean';
}

module.exports = {
	isInt
}