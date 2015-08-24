'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var config = require('../config/url');
var auth = require('../config/auth');

require('bootstrap/js/dropdown');
require('eonasdan-bootstrap-datetimepicker');

var statusDropdown = require('../workorder/component/dropdown-status');
var typeDropdown = require('../workorder/component/dropdown-type');
var factoryDropdown = require('../workorder/component/dropdown-factory');

/* DOM */
var $editBtn   = $('#workorder-info-edit-button');
var $cancelBtn = $('#workorder-info-cancel-button');
var $saveBtn   = $('#workorder-info-save-button');
var $deleteBtn = $('#workorder-info-delete-button');
var $workorderForm  = $('#workorder-info-form');
var $viewModeCollection = $workorderForm.find('.view-mode');
var $editModeCollection = $workorderForm.find('.edit-mode');
var $inputDateDatePicker = $('#workorder-inputDate-date-picker');
var $reserveDatePicker = $('#workorder-reserve-date-picker');
var $realProduceDatePicker = $('#workorder-real-produce-date-picker');
var $realFinishDatePicker = $('#workorder-real-finish-date-picker');

var isEditMode   = false;
var isCreateMode = false;

var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
var workorderID = temp[1];
temp = parameters[1].split("=");
var factoryID = temp[1];

var token = auth.getToken();

// var workorderID = "";
// var factoryID = "F002";


var today = new Date();
var DateTimePickerOpt = {
	widgetPositioning: {
        horizontal: 'auto',
        vertical: 'bottom'
    },
    // defaultDate: today,
	ignoreReadonly: true
};


var backupJdata;

initialize();

function initialize() {
	header.include();
	getFactoryList();
	showInitView();
	bindEvents();
	initializeDatetimePicker();
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteWorkOrderInfo);
	$workorderForm.submit(saveData);
}

function initializeDatetimePicker() {
	$inputDateDatePicker.datetimepicker(DateTimePickerOpt);
	$reserveDatePicker.datetimepicker(DateTimePickerOpt);
	$realProduceDatePicker.datetimepicker(DateTimePickerOpt);
	$realFinishDatePicker.datetimepicker(DateTimePickerOpt);
}

function getFactoryList(){
	$.get(config.APIUrl + 'factory/list')
	 .done(function(response){
		for (var i = 0; i < response.length; i++) {
			if(response[i].id==factoryID){
				$('#factory').find('p').text(response[i].name);
				factoryDropdown.setDropdownbyKey(response[i].id,response[i].name);
			}
		};
	 });
}

function showEditMode() {
	isEditMode = true;
	$editBtn  .hide();
	$cancelBtn.show();
	$saveBtn  .show();
	$deleteBtn.hide();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function hideEditMode() {
	if(isEditMode){
		isEditMode = false;
		$editBtn  .show();
		$cancelBtn.show();
		$saveBtn  .hide();
		$deleteBtn.show();
		$viewModeCollection.removeClass('editting');
		$editModeCollection.removeClass('editting');
		//restore original data
		$.each(backupJdata, fillList);
	}else{
		// window.location="./";
		api.goToWorkOrderIndex();
	}
}

function showInitView() {
	isEditMode = false;
	$editBtn  .show();
	$cancelBtn.show();
	$saveBtn  .hide();
	$deleteBtn.show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');

	//init list value
	$('#workorder-num').find('p').text(workorderID);
	$('#workorder-num').find('input').val(workorderID);

	api.getWorkOrderInfo(workorderID)
		.done(function(data) { 
			console.log("GET Workorder res: ", data); 
			//get init data and store it
			backupJdata = data;
			$.each(data, fillList);
		})
		 .fail(function(err) { 
		 	console.log("GET Workorder error: ", err); 
		 	//TODO init ERROR
		 	// api.goToWorkOrderIndex();
		 });

	
}


function fillList(key, value){
	switch(key){
		case "status":
			statusDropdown.setDropdownbyValue(key,value);
			$('#'+api.transferKeyS2C(key)).find('p').text(statusDropdown.getDisplayName(value));
			break;
		case "produce_type":
			typeDropdown.setDropdownbyValue(key,value);
			$('#'+api.transferKeyS2C(key)).find('p').text(value);
			break;
		default:
			$('#'+api.transferKeyS2C(key)).find('p').text(value);
			$('#'+api.transferKeyS2C(key)).find('input').val(value);
			break;
	}
	
}



function saveData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);
	saveChangedData(data);
	return false;
}

function saveChangedData(data) {
	api.editWorkOrderInfo(workorderID, data)
		 .done(function(data) { 
		 	console.log("EDIT Workorder Info done: ", data); 
		 	api.goToWorkOrderIndex();
		 })
		 .fail(function(err) { 
		 	console.log("EDIT Workorder Info error: ", err);
		 	// if fail restore old page
		 	$.each(backupJdata, fillList);
		  });
}



function deleteWorkOrderInfo() {
	var data={};
	data._token = token;
	api.deleteWorkOrder(workorderID,data)
		 .done(function(data) { 
		 	console.log("DELETE Workorder res: ", data); 
		 	//back to list
		 	api.goToWorkOrderIndex();
		})
		 .fail(function(err) { 
		 	console.log("DELETE Workorder error: ", err);
		 	// TODO ??
		 });
}


function getChangedData() {
	var newData = {};
	$editModeCollection.each(function(index, el) {
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
			var selectedName;
			if(typeof $dropdownSelected.attr('selectname')!='undefined'){
				selectedName = api.transferKeyC2S($dropdownSelected.attr('selectname'));
			}else{
				selectedName = api.transferKeyC2S($(el).attr('selectname'));
			}

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
			if(typeof selectedName!='undefined' && selectedValue!="disable")
				newData[selectedName] = selectedValue;

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
	console.log("getFactoryId = "+cur_factoryid);
	if(typeof cur_factoryid!='undefined')
		return cur_factoryid;
	else
		return "";
}