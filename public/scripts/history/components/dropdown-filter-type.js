'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var userId = require('../../config/auth');
var config = require('../../config/url');
var valueDropdown = require('./dropdown-filter-value');

var selectedFilter;

/* DOM */
var $filterDropdown = $('.dropdown-history-filter');
var $filterFocusName = $('#filter-focus-item-name');

exports = module.exports = {};

exports.getSelectedFilter = function() {
	return selectedFilter;
}

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
	selectedFilter = $(this).data('id');

	$filterFocusName.text(displayName).data(selectedFilter);

	displaySelector();
}

function setDefault() {
	var $defaultItem = $filterDropdown.find('.option-item').eq(0);
	var displayName = $defaultItem.text();
	selectedFilter = $defaultItem.data('id');

	$filterFocusName.text(displayName).data(selectedFilter);

	displaySelector();
}

function displaySelector() {
	if(selectedFilter === 'date_period'){
		valueDropdown.hide();
	}else {
		valueDropdown.showAndRenderDropdown(selectedFilter);
	}
}