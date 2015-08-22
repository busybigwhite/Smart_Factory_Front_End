'use strict';
var $ = window.jQuery = require('jquery');
var EventEmitter = require('wolfy87-eventemitter');

require('eonasdan-bootstrap-datetimepicker');

/* DOM */
var $datePeriodBlock = $('#history-date-period-block');
var $startDatePicker = $('#history-start-date-picker');
var $endDatePicker = $('#history-end-date-picker');
var $searchBtn = $('#history-search-btn');

var emitter = new EventEmitter();
var today = new Date();
var startDateTimePickerOpt = {
	widgetPositioning: {
		horizontal: 'auto',
		vertical: 'bottom'
	},
	defaultDate: new Date().setDate(new Date().getDate() - 7),
	maxDate: today,
	ignoreReadonly: true
};
var endDateTimePickerOpt = {
	widgetPositioning: {
        horizontal: 'auto',
        vertical: 'bottom'
    },
    defaultDate: today,
    maxDate: today,
    useCurrent: false,
	ignoreReadonly: true
};

var searchPeriod = {};

exports = module.exports = {};

exports.emitter = emitter;

exports.show = function(){
	$datePeriodBlock.removeClass('hidden');
}

exports.hide = function(){
	$datePeriodBlock.addClass('hidden');
}


initialize();

function initialize() {
	initializeDatetimePicker();
	bindEvents();
}

function initializeDatetimePicker() {
	$startDatePicker.datetimepicker(startDateTimePickerOpt);
	$endDatePicker.datetimepicker(endDateTimePickerOpt);
}

function bindEvents() {
	bindChangeLimitDateEventOnDatetimePickers();
	bindSearchListEventOnButton();
}

function bindChangeLimitDateEventOnDatetimePickers() {
	$startDatePicker.on("dp.change", changeLimitDate);
	$endDatePicker.on("dp.change", changeLimitDate);
}

function changeLimitDate(e) {
	e.target.id.split('-')[1] === 'start'
		? $endDatePicker.data("DateTimePicker").minDate( e.date )
		: $startDatePicker.data("DateTimePicker").maxDate( e.date );
}

function bindSearchListEventOnButton() {
	$searchBtn.on('click', searchPeriodList);
}

function searchPeriodList() {
	var newEndDateObj = resetEndDateLimit();
	var newEndDateString = convertToDateString( newEndDateObj );

	searchPeriod = {
		'start_date': $startDatePicker.val(),
		'end_date': newEndDateString
	}

	emitter.emit('periodSearch', searchPeriod);
}

function resetEndDateLimit() {
	var date = new Date( $endDatePicker.val() );

	return date.setDate(date.getDate() + 1);
}

function convertToDateString(date) {
	var dateObj = new Date(date);
	var dateString = dateObj.getFullYear() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getDate();

	return dateString;
}