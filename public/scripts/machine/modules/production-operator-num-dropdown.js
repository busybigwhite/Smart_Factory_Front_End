'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var $checkPeriod  = $('#machine-production-operator-num');
var $periodView   = $checkPeriod.find('.view-mode').eq(0);
var $numView     = $checkPeriod.find('.view-mode').eq(1);
var $selectedNum = $('#machine-production-operator-num-dropdown').find('.selected-option');
var $numDropdownList = $('ul[aria-labelledby="machine-production-operator-num-dropdown"]').find('.option');
var defaultNum = 0;
var defaultNumStirng = "0";


exports.init     = initProductionOperator;
exports.getValue = getValue;
exports.getNum  = getNum;
exports.setDefault  = setDefault;

function initProductionOperator(num) {
	console.log('check initialView:', num);
	initialView(num);
	bindEvents();
}

function setDefault() {
	setDefaultNum();
	bindEvents();
}

function initialView(num) {
	$periodView.text(num);
	$numView.text(num);
	$selectedNum.text(num).data('num', num);

	if (!num) setDefaultNum();
}

function setDefaultNum() {
	console.log('setDefaultNum:', defaultNumStirng, defaultNum);
	$numView.text(defaultNumStirng);
	$selectedNum.text(defaultNumStirng).data('num', defaultNum);
}

function bindEvents() {
	$numDropdownList.on('click', changeNum);
}

function changeNum() {
	var num = $(this).attr('num');
	$selectedNum.text(num).data('num', num);
}

function getValue() {
	return $periodInput.val();
}

function getNum() {
	return $selectedNum.data('num');
}