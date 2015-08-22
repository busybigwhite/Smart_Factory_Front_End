'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var $checkPeriod  = $('#machine-check-period');
var $periodView   = $checkPeriod.find('.view-mode').eq(0);
var $periodInput  = $checkPeriod.find('.edit-mode').eq(0);
var $typeView     = $checkPeriod.find('.view-mode').eq(1);
var $selectedType = $('#machine-check-period-dropdown').find('.selected-option');
var $typeDropdownList = $('ul[aria-labelledby="machine-check-period-dropdown"]').find('.option');
var TYPE = {
	time: '次',
	times: '天',
};
var defaultType = 'time';
var defaultTypeStirng = TYPE.time;


exports.init     = initCheckPeriod;
exports.getValue = getValue;
exports.getType  = getType;
exports.setDefaultType  = setDefaultType;

function initCheckPeriod(val, type) {
	console.log('check initialView:', val, type);
	initialView(val, type);
	bindEvents();
}

function initialView(val, type) {
	$periodView.text(val);
	$periodInput.val(val);
	$typeView.text(TYPE[type]);
	$selectedType.text(TYPE[type]).data('type', type);

	if (!type) setDefaultType();
}

function setDefaultType() {
	console.log('setDefaultType:', defaultTypeStirng, defaultType);
	$typeView.text(defaultTypeStirng);
	$selectedType.text(defaultTypeStirng).data('type', defaultType);
}

function bindEvents() {
	$typeDropdownList.on('click', changeType);
}

function changeType() {
	var type = $(this).attr('type');
	$selectedType.text(TYPE[type]).data('type', type);
}

function getValue() {
	return $periodInput.val();
}

function getType() {
	return $selectedType.data('type');
}