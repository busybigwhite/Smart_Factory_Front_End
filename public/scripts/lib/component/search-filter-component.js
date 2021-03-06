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
var $filterDropdown = $('.dropdown-filter');
var $filterFocusName = $('#filter-focus-item-name');
var $searchInput = $('.search-input');
var $searchBtn = $('.search-btn');

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedFilter = function(){
	return selectedFilter;
}

exports.setDefaultOption = function(){
	$filterDropdown.find('.option-item').eq(0).trigger('click');
}

exports.reset = function(){
	$filterDropdown.find('.option-item').eq(0).trigger('click');
	$searchInput.val('');
}

initialize();

function initialize() {
	bindEvents();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
	bindSearchByFilterOnButton();
	bindSearchByFilterOnKeypress();
}

function bindSetFocusNameBlockEventOnSelector() {
	$filterDropdown.on('click', '.option-item', setFocusNameBlock);
}

function bindSearchByFilterOnButton() {
	$searchBtn.on('click', searchByFilter);
}

function bindSearchByFilterOnKeypress() {
	$searchInput.on('keypress', searchByKeypress);
}

function setFocusNameBlock() {
	var displayName = $(this).text();
	selectedFilter = $(this).data('id');

	$filterFocusName.text(displayName).data('id', selectedFilter);
	$searchInput.val('');
}

function searchByKeypress(e) {

	var code = e.keyCode || e.which;

	code === 13 && searchByFilter();
}

function searchByFilter(){
	var searchKey = $searchInput.val();
	var data = {};
	data[selectedFilter] = searchKey;

	emitter.emit('search', data);
}