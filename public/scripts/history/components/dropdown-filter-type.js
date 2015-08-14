'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var userId = require('../../config/auth');
var config = require('../../config/url');
var valueDropdown = require('./dropdown-filter-value');

/* DOM */
var $filterDropdown = $('#dropdown-history-filter');
var $filterFocusName = $('#filter-focus-item-name');

exports = module.exports = {};

initialize();

function initialize() {
	bindEvents();
	setDefault();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$filterDropdown.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock() {
	var displayName = $(this).text();
	var id = $(this).data('id');

	$filterFocusName.text(displayName).data(id);

	displaySelector(id);
}

function setDefault() {
	var $defaultItem = $filterDropdown.find('.option-item').eq(0);
	var displayName = $defaultItem.text();
	var id = $defaultItem.data('id');

	$filterFocusName.text(displayName).data(id);

	displaySelector(id);
}

function displaySelector(id) {
	var type = id.split('_')[0];

	if(type === 'date'){
		valueDropdown.hide();
	}else {
		valueDropdown.showAndRenderDropdown(type);
	}
}