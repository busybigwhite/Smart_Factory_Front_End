'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var statusDropdown = require('../workorder/component/dropdown-status');
var typeDropdown = require('../workorder/component/dropdown-type');
var factoryDropdown = require('../workorder/component/dropdown-factory');

require('bootstrap/js/dropdown');
require('eonasdan-bootstrap-datetimepicker');

/* DOM */
var $cancelBtn = $('#workorder-new-cancel-button');
var $newBtn   = $('#workorder-new-new-button');
var $workorderForm  = $('#workorder-new-form');
var $newOrderCollection = $workorderForm.find('.newOrder');
var $inputDateDatePicker = $('#workorder-inputDate-date-picker');
var $reserveDatePicker = $('#workorder-reserve-date-picker');
var $realProduceDatePicker = $('#workorder-real-produce-date-picker');
var $realFinishDatePicker = $('#workorder-real-finish-date-picker');

var today = new Date();
var DateTimePickerOpt = {
	widgetPositioning: {
        horizontal: 'auto',
        vertical: 'bottom'
    },
	ignoreReadonly: true
};

initialize();

function initialize() {
	header.include();
	bindEvents();
	initView();
	initializeDatetimePicker();
}

function initView(){
	$("#inputDate").val(getDateTime());
}

function bindEvents() {
	$cancelBtn.on('click', backToList);
	$workorderForm.submit(createData);
}


function backToList() {
	// window.location="./";
	api.goToWorkOrderIndex();
}

function initializeDatetimePicker() {
	$inputDateDatePicker.datetimepicker(DateTimePickerOpt);
	$inputDateDatePicker.data("DateTimePicker").defaultDate(today);
	$reserveDatePicker.datetimepicker(DateTimePickerOpt);
	$realProduceDatePicker.datetimepicker(DateTimePickerOpt);
	$realFinishDatePicker.datetimepicker(DateTimePickerOpt);
}

function createData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);
	saveNewData(data);
	return false;
}

function saveNewData(data) {
	api.createWorkOrder(data)
		 .done(function(data) { 
		 	console.log("CREATE Machine res: ", data); 
		 	api.goToWorkOrderIndex();
		 })
		 .fail(function(err) { 
		 	console.log("CREATE Machine error: ", err); 
		 	//TODO ??
		 });
}

function getChangedData() {
	var newData = {};
	$newOrderCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();
		var $dropdownSelected = $(el).find('.selected-option');
		if (name) {
			name = api.transferKeyC2S(name);
			value = value ? value : '';
			newData[name] = value;

		} else if ($dropdownSelected) {
			// var selectedName  = $dropdownSelected.attr('name');
			var selectedName = api.transferKeyC2S($(el).attr('selectname'));
			var selectedValue;
			switch(selectedName){
				case "status":
					selectedValue = getStatusName();
					break;
				case "factory":
					selectedValue = getFactoryId();
					break;
				case "produce_type":
					selectedValue = getTypeName();
					break;
				case "order_date":
					selectedValue = $inputDateDatePicker.val();
					break;
				case "schedule_date":
					selectedValue = $reserveDatePicker.val();
					break;
				case "start_date":
					selectedValue = $realProduceDatePicker.val();
					break;
				case "finish_date":
					selectedValue = $realFinishDatePicker.val();
					break;
				default:
					selectedValue = "";
					break;
			}
			newData[selectedName] = selectedValue;

		} else {
			console.log('getChangedData error: missing some value');
		}
	});
	return newData;
}

function getStatusName() {
	return statusDropdown.getSelectedStatus();
}

function getTypeName(){
	return typeDropdown.getSelectedType();
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}



