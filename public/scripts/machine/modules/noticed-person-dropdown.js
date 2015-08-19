'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var $noticedPerson = $('#machine-noticed-person');
var $noticedPersonDropdown = $('#machine-notice-dropdown');

exports.init = initNoticeedPerson;

function initNoticeedPerson(id) {
	$noticedPerson.find('.view-mode').text(id);
	$noticedPersonDropdown.find('.selected-option').text(id);
	bindEvents();
}

function bindEvents() {
	// TODO
}