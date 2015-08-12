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
		url: '',
		contentType: 'application/json',
		dataType: 'json',
		success: function(){ console.log('test API success!!!') }
	});
}