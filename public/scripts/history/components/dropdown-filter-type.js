'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var EventEmitter = require('wolfy87-eventemitter');

var selectedFilter;
var emitter = new EventEmitter();

/* DOM */
var $filterDropdown = $('.dropdown-history-filter');
var $filterFocusName = $('#filter-focus-item-name');

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedFilter = function(){
	return selectedFilter;
}

exports.triggerClick = function(){
	$filterDropdown.find('.option-item').eq(0).trigger('click');
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

	$filterFocusName.text(displayName).data('id', selectedFilter);

	emitter.emit('filterChanged', selectedFilter);
}

function setDefault() {
	var $defaultItem = $filterDropdown.find('.option-item').eq(0);
	var displayName = $defaultItem.text();
	selectedFilter = $defaultItem.data('id');

	$filterFocusName.text(displayName).data(selectedFilter);

	emitter.emit('filterChanged', selectedFilter);
}