'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var templates = require('../templates');
var EventEmitter = require('wolfy87-eventemitter');

var selectedValue;
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

function setFocusValueBlock(target) {
	var displayName = target.type==='click' ? $(this).text() : target.name;
	selectedValue = target.type==='click' ? $(this).data('id') : target.id;

	$filterValueFocusName.text(displayName).data('id', selectedValue);

	emitter.emit('valueChanged', selectedValue);
}

function getValueThenRenderDropdown(type) {

	$.ajax({
		url: config.APIUrl + 'history/filter?type=' + type,
		beforeSend: function(){
			selectedValue = undefined;
			$filterValueFocusName.empty();
			$filterValueMenu.empty();
		}
	}).done(function(response){

	 	if( response.length ){
		 	var filters = _.uniq(response);
			var filterListRows = templates.renderFilterDropdown({ filters : filters });

			$filterValueMenu.html( filterListRows );

			setFocusValueBlock( filters[0] );

		}else {
			emitter.emit('valueChanged', selectedValue);
		}
	});
}