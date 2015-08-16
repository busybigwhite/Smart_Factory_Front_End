'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var templates = require('../templates');

/* DOM */
var $valueDropdown = $('#dropdown-value-list');
var $filterValueFocusName = $('#focus-value');
var $filterValueMenu = $('#filter-value-list');

var selectedValue;

exports = module.exports = {};

exports.showAndRenderDropdown = function(type) {
	getValueThenRenderDropdown(type);
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
	bindEvents();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$filterValueMenu.on('click', '.option-item', setFocusValueBlock);
}

function setFocusValueBlock() {
	var displayName = $(this).text();
	selectedValue = $(this).data('id');

	$filterValueFocusName.text(displayName).data(selectedValue);
}

function getValueThenRenderDropdown(type) {

	// $.get(config.APIUrl + 'history/filter/:' + userId?type=' + type)
	$.get(config.APIUrl + 'history/filter?type=' + type)
	 .done(function(response){
	 	var filters = _.uniq(response);
		var filterListRows = templates.renderFilterDropdown({ filters : filters });

		$filterValueMenu.empty().html( filterListRows );
	 });
}