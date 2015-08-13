'use strict';

var $ = window.jQuery = require('jquery');

var $maintainPeriod = $('#machine-maintain-period');
var $maintainPeriodDropdown = $('#machine-maintain-period-dropdown');

exports.init = initMaintainPeriod;

function initMaintainPeriod(val, type) {
	$maintainPeriod.find('.view-mode').eq(0).text(val);
	$maintainPeriod.find('.view-mode').eq(1).text(type);
	$maintainPeriod.find('.edit-mode').eq(0).val(val);
	$maintainPeriodDropdown.find('.selected-option').text(type);
	bindEvents();
}

function bindEvents() {
	// TODO
}
