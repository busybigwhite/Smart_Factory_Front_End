'use strict';

var $ = window.jQuery = require('jquery');

var $checkPeriod = $('#machine-check-period');
var $checkPeriodDropdown = $('#machine-check-period-dropdown');

exports.init = initCheckPeriod;

function initCheckPeriod(val, type) {
	$checkPeriod.find('.view-mode').eq(0).text(val);
	$checkPeriod.find('.view-mode').eq(1).text(type);
	$checkPeriod.find('.edit-mode').eq(0).val(val);
	$checkPeriodDropdown.find('.selected-option').text(type);
	bindEvents();
}

function bindEvents() {
	// TODO
}