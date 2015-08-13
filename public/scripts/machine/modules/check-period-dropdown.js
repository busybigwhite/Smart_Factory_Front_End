'use strict';

var $ = window.jQuery = require('jquery');

var $checkPeriod  = $('#machine-check-period');
var $periodView   = $checkPeriod.find('.view-mode').eq(0);
var $periodInput  = $checkPeriod.find('.edit-mode').eq(0);
var $typeView     = $checkPeriod.find('.view-mode').eq(1);
var $selectedType = $('#machine-check-period-dropdown').find('.selected-option');
var $typeDropdownList = $('ul[aria-labelledby="machine-check-period-dropdown"]').find('.option');

exports.init     = initCheckPeriod;
exports.getValue = getValue;
exports.getType  = getType;

function initCheckPeriod(val, type) {
	$periodView.text(val);
	$periodInput.val(val);
	$typeView.text(type);
	$selectedType.text(type);
	bindEvents();
}

function bindEvents() {
	$typeDropdownList.on('click', changeType);
}

function changeType() {
	var type = $(this).attr('type');
	$selectedType.text(type);
}

function getValue() {
	return $periodInput.val();
}

function getType() {
	return $selectedType.text();
}