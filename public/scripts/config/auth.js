'use strict';

/**
 * auth.js
 *
 * @author  Bigwhite Tseng
 *
 */

var Cookies = require('cookies-js');

exports = module.exports = {};

exports.set = function(token) {
	Cookies.set('AUTH', token, { expires: new Date() });
};

exports.get = function() {
	return Cookies.get('AUTH');
};
