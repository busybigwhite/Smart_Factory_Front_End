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
	bindSearchListEventOnButton();
}

function bindSearchListEventOnButton() {
	$searchBtn.on('click', searchPeriodList);
}

function searchPeriodList(evt) {

	if( !validateDate() ) return;

	searchPeriod = {
		'start_date': $startDatePicker.val(),
		'end_date': $endDatePicker.val()
	}

	emitter.emit('periodSearch', searchPeriod);
}

function validateDate(){
	var start = new Date( $startDatePicker.val() );
	var end = new Date( $endDatePicker.val() );

	if(start > end){
		alert("起始日期不得大於結束日期");
		return false;
	}else {
		return true;
	}
}