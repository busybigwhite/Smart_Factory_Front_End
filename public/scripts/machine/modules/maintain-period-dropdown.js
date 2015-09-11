'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var $maintainPeriod = $('#machine-maintain-period');
var $periodView   = $maintainPeriod.find('.view-mode').eq(0);
var $periodInput  = $maintainPeriod.find('.edit-mode').eq(0);
var $typeView     = $maintainPeriod.find('.view-mode').eq(1);
var $selectedType = $('#machine-maintain-period-dropdown').find('.selected-option');
var $typeDropdownList = $('ul[aria-labelledby="machine-maintain-period-dropdown"]').find('.option');
var TYPE = {
	time: '次',
	times: '天',
};
var defaultType = 'times';
var defaultTypeStirng = TYPE.times;


exports.init     = initMaintainPeriod;
exports.getValue = getValue;
exports.getType  = getType;
exports.setDefault  = setDefault;

function initMaintainPeriod(val, type) {
	console.log('maintain initialView:', val, type);
	initialView(val, type);
	bindEvents();
}

function setDefault() {
	setDefaultType();
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