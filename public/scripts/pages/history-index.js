'use strict';
var $ = window.jQuery = require('jquery');
// var moment = window.moment = require('moment');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var templates = require('../history/templates');
var factoryDropdown = require('../lib/component/dropdown-factory');

require('eonasdan-bootstrap-datetimepicker');
require('../history/components/dropdown-filter-type');

/* DOM */
var $tableListBlock = $('#history-table-block');
var $imageBlock = $('#history-img-block');
var $searchBtn = $('#history-search-btn');
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
	header.include();
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
	bindSearchListEventOnButton();
}

function bindSearchListEventOnButton() {
	$searchBtn.on('click', searchHistoryThenRenderRows);
}

function searchHistoryThenRenderRows() {

	// $.get(config.APIUrl + 'history/list/:' + userId + '?factory_id=' + focusFactoryId + 'type=' + type + '&search_key=' + searchKey)
	$.get(config.APIUrl + 'history/list/?factory_id=' + focusFactoryId + '&type=' + type + '&search_key=' + searchKey)
	 .done(function(response){
		var tableListRows = templates.renderTableList({ infos : response });

		$tableListBlock.empty().append( tableListRows );
	 });
}
