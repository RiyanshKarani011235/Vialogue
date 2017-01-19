var validate = require('validate.js');

var constraints = {
  creditCardNumber: {
    presence: true,
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: function(value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^%{num} is not a valid credit card number", {
          num: value
        });
      }
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15};
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  creditCardZip: function(value, attributes, attributeName, options, constraints) {
    if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
    console.log('hmmm');
    return {
      presence: {message: "is required when using AMEX"},
      length: {is: 5}
    };
  }
};

console.log(validate({creditCardNumber: "4"}, constraints));
// => {"creditCardNumber": ["Credit card number is the wrong length (should be 16 characters)"]}

console.log(validate({creditCardNumber: "9999999999999999"}, constraints));
// => {"creditCardNumber": ["9999999999999999 is not a valid credit card number"]}

console.log(validate({creditCardNumber: "4242424242424242"}, constraints));
// => undefined

console.log(validate({creditCardNumber: "340000000000000", creditCardZip: "13451"}, constraints));
// => {"creditCardZip": ["Credit card zip is required when using AMEX"]}