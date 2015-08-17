'use strict';
var $ = window.jQuery = require('jquery');

require('eonasdan-bootstrap-datetimepicker');

/* DOM */
var $startDatePicker = $('#history-start-date-picker');
var $endDatePicker = $('#history-end-date-picker');
var today = new Date();
var dateTimePickerOpt = {
		widgetPositioning: {
			horizontal: 'auto',
			vertical: 'bottom'
		},
		maxDate: today,
		ignoreReadonly: true
	};


initialize();

function initialize() {
	initializeDatetimePicker();
	bindEvents();
}

function initializeDatetimePicker() {
	$startDatePicker.datetimepicker(dateTimePickerOpt);
	$endDatePicker.datetimepicker(dateTimePickerOpt);

	setDefaultDate();
}

function setDefaultDate() {
	$startDatePicker.data("DateTimePicker").defaultDate(today);
	$endDatePicker.data("DateTimePicker").defaultDate(today);
}

function bindEvents() {

}