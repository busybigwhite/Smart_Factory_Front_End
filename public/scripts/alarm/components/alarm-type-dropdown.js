'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var EventEmitter = require('wolfy87-eventemitter');
require('bootstrap/js/dropdown');

var emitter = new EventEmitter();

/* DOM */
var $filterDropdown = $('.dropdown-history-filter');
var $filterFocusName = $('#filter-focus-item-name');

exports = module.exports = {};

exports.emitter = emitter;

exports.init = function(id) {
	var $el 	   = $('#' + id);
	var $menu 	   = $el.find('.dropdown-menu');
	var $focusName = $el.find('.dropdown-focus-name');

	var opts = ['E-mail'];
	$menu.empty().append( renderMenuOptions({ opts: opts }) );

	$el.on('click', '.option-item', setFocusNameBlock);

	$focusName.text( $el.data('value') );
}

function renderMenuOptions(opts) {
	var menuTemp = _.template(
		`<% _.forEach(opts, function(opt) {  %>
			<li><a class="option-item" data-id=<%= opt %>>
					<%= opt %>
			</a></li>
		<% });                                          %>`
	);

  return menuTemp(opts);
}

function setFocusNameBlock() {
	var $el 	    = $(this).parents('.alarm-type-dropdown');
	var $focusName  = $el.find('.dropdown-focus-name');
	var displayName = $(this).text();

	$focusName.text(displayName);
	$el.data('value', displayName);
}