'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Dropdown, EventEmitter);

module.exports = exports = Dropdown;

Dropdown.constructor = Dropdown;

/* DOM */
var $dropdown;
var $focusName;

var opts;
var DEFAULT_OPTS = {
	setDefault: true
}

function Dropdown(selector, focusName, opts) {
	if ( ! (this instanceof Dropdown)) return new Dropdown(selector, focusName, opts);
	opts = _.extend({}, DEFAULT_OPTS, opts);

	$dropdown = $(selector);
	$focusName = $(focusName);

	initialize();
}

Dropdown.prototype.get = function() {
	return this;
}

function initialize() {
	bindEvents();
	setDefault();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$dropdown.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock() {
	var displayName = $(this).text();
	var id = $(this).data('id');

	$focusName.text(displayName).data(id);

	this.emit('displayNameChanged', id);
}

function setDefault() {

	if( !$dropdown.find('.option-item') ) return;

	var $defaultItem = $dropdown.find('.option-item').eq(0);

	var displayName = $defaultItem.text();
	var id = $defaultItem.data('id');

	$focusName.text(displayName).data(id);

	this.emit('displayNameChanged', id);
}
