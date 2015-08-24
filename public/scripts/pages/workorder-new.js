'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var statusDropdown = require('../workorder/component/dropdown-status');
var typeDropdown = require('../workorder/component/dropdown-type');
var factoryDropdown = require('../workorder/component/dropdown-factory');
var auth = require('../config/auth');

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

var token = auth.getToken();

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
	initializeDatetimePicker();
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
		 	console.log("CREATE workorder done: ", data); 
		 	api.goToWorkOrderIndex();
		 })
		 .fail(function(err) { 
		 	console.log("CREATE workorder error: ", err); 
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
			if(name=="current_num"||name=="current_fail_num"||name=="abnormal_num"){
				value = "disable";
			}else{
				value = value ? value : '';
			}
			if(value !="disable"){
				newData[name] = value;
			}
		} else if ($dropdownSelected) {
			// var selectedName  = $dropdownSelected.attr('name');
			var selectedName = api.transferKeyC2S($(el).attr('selectname'));
			var selectedValue;
			switch(selectedName){
				case "status":
					selectedValue = getStatusName();
					break;
				case "factory_id":
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
					// selectedValue = $realProduceDatePicker.val();
					selectedValue = "disable";
					break;
				case "finish_date":
					// selectedValue = $realFinishDatePicker.val();
					selectedValue = "disable";
					break;
				default:
					selectedValue = "";
					break;
			}
			if(selectedValue != "disable" && selectedValue!=""){
				newData[selectedName] = selectedValue;
			}
			

		} else {
			console.log('getChangedData error: missing some value');
		}
	});
	newData._token = token;
	return newData;
}

function getStatusName() {
	var cur_status = statusDropdown.getSelectedStatus();
	if(typeof cur_status!='undefined')
		return cur_status;
	else
		return "";
}

function getTypeName(){
	var cur_type = typeDropdown.getSelectedType();
	if(typeof cur_type!='undefined')
		return cur_type;
	else
		return "";
}

function getFactoryId() {

	var cur_factoryid = factoryDropdown.getSelectedFactoryId();

	if(typeof cur_factoryid!='undefined')
		return cur_factoryid;
	else
		return "";
}



