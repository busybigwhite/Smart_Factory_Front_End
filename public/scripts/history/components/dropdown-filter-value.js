'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var templates = require('../templates');
var EventEmitter = require('wolfy87-eventemitter');

var selectedValue;
var filterValues = {};
var emitter = new EventEmitter();

/* DOM */
var $valueDropdown = $('#dropdown-value-list');
var $filterValueFocusName = $('#focus-value');
var $filterValueMenu = $('#filter-value-list');

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedValue = function(){
	return selectedValue;
}

exports.showAndRenderDropdown = function(type) {
	renderDropdown(type);
	$valueDropdown.removeClass('hidden');
}

exports.hide = function() {
	$valueDropdown.addClass('hidden');
}

exports.getSelectedValue = function() {
	return selectedValue;
}

initialize();

function initialize() {
	getValues();
	bindEvents();
}

function getValues() {
	$.get(config.APIUrl + 'history/filter')
	 .done(function(response){ filterValues = response });
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$filterValueMenu.on('click', '.option-item', setFocusValueBlock);
}

function setFocusValueBlock(target) {
	var displayName = target.type==='click' ? $(this).text() : target.name;
	selectedValue = target.type==='click' ? $(this).data('id') : target.id;

	$filterValueFocusName.text(displayName).data('id', selectedValue);

	emitter.emit('valueChanged', selectedValue);
}

function renderDropdown(type) {

	resetBlock();

	var filterType = _.camelCase(type).replace('id', 's');

	if( filterValues[filterType].length ){
	 	var filters = _.uniq( filterValues[filterType] );
		var filterListRows = templates.renderFilterDropdown({ filters : filters });

		$filterValueMenu.html( filterListRows );

		setFocusValueBlock( filters[0] );
	}else {
		emitter.emit('valueChanged', selectedValue);
	}
}

function resetBlock() {
	selectedValue = undefined;
	$filterValueFocusName.empty();
	$filterValueMenu.empty();
}