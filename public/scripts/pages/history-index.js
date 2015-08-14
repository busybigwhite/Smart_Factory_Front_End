'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var templates = require('../history/templates');

require('../history/components/dropdown-filter-type');

/* DOM */

initialize();

function initialize() {
	header.include();
	bindEvents();
}

function bindEvents() {

}
