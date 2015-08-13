'use strict';

var $ = window.jQuery = require('jquery');

var $maintainPeriod = $('#machine-maintain-period');
var $periodView   = $maintainPeriod.find('.view-mode').eq(0);
var $periodInput  = $maintainPeriod.find('.edit-mode').eq(0);
var $typeView     = $maintainPeriod.find('.view-mode').eq(1);
var $selectedType = $('#machine-maintain-period-dropdown').find('.selected-option');
var $typeDropdownList = $('ul[aria-labelledby="machine-maintain-period-dropdown"]').find('.option');

exports.init     = initMaintainPeriod;
exports.getValue = getValue;
exports.getType  = getType;

function initMaintainPeriod(val, type) {
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