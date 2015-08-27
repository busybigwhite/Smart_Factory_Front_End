'use strict';

/**
 * auth.js
 *
 * @author  Bigwhite Tseng
 *
 */

var $ = window.jQuery = require('jquery');
var Cookies = require('cookies-js');
var config = require('./url');

exports = module.exports = {};

exports.set = function(name, token,authority) {
	Cookies.set('name', name);
	Cookies.set('token', token);
	Cookies.set('authority', authority);
};

exports.getName = function() {
	return Cookies.get('name');
};

exports.getToken = function() {
	return Cookies.get('token');
};

exports.getAuthority = function() {
	return Cookies.get('authority');
};

exports.refreshToken = function() {
	var defer = $.Deferred();

	$.get( config.baseUrl + "/api/token" )
  	 .done(function(res) {
  	 	console.log('refresh token: ', res.csrf_token);
    	defer.resolve(res.csrf_token);
  	 })
  	 .fail(function(){ console.log('refresh token failed') });

  	 return defer.promise();
};
