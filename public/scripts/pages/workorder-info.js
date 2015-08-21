'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var config = require('../config/url');

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
		 	console.log("EDIT Workorder Info res: ", data);
		 	api.goToWorkOrderIndex();
		 })
		 .fail(function(err) {
		 	console.log("EDIT Workorder Info error: ", err);
		 	// if fail restore old page
		 	$.each(backupJdata, fillList);
		  });
}



function deleteWorkOrderInfo() {
	api.deleteWorkOrder(workorderID)
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
			value = value ? value : '';
			newData[name] = value;

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
			if(typeof selectedName!='undefined')
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