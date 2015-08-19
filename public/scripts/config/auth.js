'use strict';

/**
 * auth.js
 *
 * @author  Bigwhite Tseng
 *
 */

var Cookies = require('cookies-js');

exports = module.exports = {};

exports.set = function(name, token) {
	Cookies.set('name', name);
	Cookies.set('token', token);
};

exports.remove = function() {
	Cookies.remove('name');
	Cookies.remove('token');
};

exports.getName = function() {
	return Cookies.get('name');
};

exports.getToken = function() {
	return Cookies.get('token');
};