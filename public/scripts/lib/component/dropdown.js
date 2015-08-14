'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Dropdown, EventEmitter);

module.exports = Dropdown;

/* DOM */
var $dropdown;
var $focusName;
var $this;

function Dropdown(selector) {
	if ( ! (this instanceof Dropdown)) return new Dropdown(selector);

	$this = this;
	$this.$dropdown = $(selector);
	$this.$focusName = $(selector).find('.focus-item-name');

	initialize();
}

function initialize() {
	bindEvents();
	setDefault();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$this.$dropdown.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock() {
	var displayName = $(this).text();
	var id = $(this).data('id');

	$this.$focusName.text(displayName).data(id);

	$this.emit('displayNameChanged', id);
}

function setDefault() {

	if( !$this.$dropdown.find('.option-item') ) return;

	var $defaultItem = $this.$dropdown.find('.option-item').eq(0);

	var displayName = $defaultItem.text();
	var id = $defaultItem.data('id');

	$this.$focusName.text(displayName).data(id);

	$this.emit('displayNameChanged', id);
}
