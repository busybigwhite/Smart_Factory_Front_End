'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var userId = require('../../config/auth');
var config = require('../../config/url');
var templates = require('../templates');

/* DOM */
var $valueDropdown = $('#dropdown-value-list');
var $filterValueFocusName = $('#focus-value');
var $filterValueMenu = $('#filter-value-list');

var filterType;

exports = module.exports = {};

exports.showAndRenderDropdown = function(type) {
	getValueThenRenderDropdown(type);
	$valueDropdown.removeClass('hidden');
}

exports.hide = function() {
	$valueDropdown.addClass('hidden');
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
	var id = $(this).data('id');

	$filterValueFocusName.text(displayName).data(id);

	getItemListThenRenderRows(id);
}

function getItemListThenRenderRows(id) {
	// $.get(config.APIUrl + 'history/:' + userId?type=' + type + 'id=' + id)
	$.get(config.APIUrl + 'history?type=' + filterType + 'id=' + id)
	 .done(function(response){
		// var tableListRows = templates.renderTableList({ lists : response });

		// $filterValueMenu.empty().html( tableListRows );
	 });
}

function getValueThenRenderDropdown(type) {
	filterType = type;

	// $.get(config.APIUrl + 'history/list/:' + userId?type=' + filterType)
	$.get(config.APIUrl + 'history/list?type=' + filterType)
	 .done(function(response){
		var filterListRows = templates.renderFilterDropdown({ filters : response });

		$filterValueMenu.empty().html( filterListRows );
	 });
}
