'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');

initialize();

function initialize() {
	header.include();
	test();
}

function test() {
	$.ajax({
		url: 'http://smartfactory.moremote.com/api/version',
		contentType: 'application/json',
		dataType: 'json',
		success: function(error){ console.log('test API success!!!') }
	});
}