'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

exports = module.exports = {};

exports.include = function(){
	$("#header").load(config.headerUrl);
}