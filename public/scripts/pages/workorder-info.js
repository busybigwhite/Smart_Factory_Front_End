'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');

require('bootstrap/js/dropdown');
// var noticeedPersonDropdown = require('../machine/modules/noticed-person-dropdown');
// var checkPeriodDropdown    = require('../machine/modules/check-period-dropdown');
// var maintainPeriodDropdown = require('../machine/modules/maintain-period-dropdown');

/* DOM */
var $editBtn   = $('#workorder-info-edit-button');
var $cancelBtn = $('#workorder-info-cancel-button');
var $saveBtn   = $('#workorder-info-save-button');
var $deleteBtn = $('#workorder-info-delete-button');
var $workorderForm  = $('#workorder-info-form');
var $viewModeCollection = $workorderForm.find('.view-mode');
var $editModeCollection = $workorderForm.find('.edit-mode');

var isEditMode   = false;
var isCreateMode = false;

//FOR TEST
var workorderID = "";
var factory = "A";

// var parameters = location.search.substring(1).split("&");
// var temp = parameters[0].split("=");
// var workorderID = temp[1];
// temp = parameters[1].split("=");
// var factory = temp[1];


var backupJdata;

initialize();

function initialize() {
	// workorderID = GET FROM PREV PAGE
	header.include();
	showInitView();
	bindEvents();
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteWorkOrderInfo);
	$workorderForm.submit(saveData);
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
	$('#workorder-num').find('p').text(workorderID);
	$('#workorder-num').find('input').val(workorderID);
	$('#factory').find('p').text(factory);
	$('#factory').find('input').val(factory);

	api.getWorkOrderInfo(workorderID)
		.done(function(data) { 
			console.log("GET workorder res: ", data); 
			backupJdata = data;
			$.each(data, fillList);
		})
		 .fail(function(err) { console.log("GET workorder error: ", err); });
}


function fillList(key, value){
	console.log(key);
	$('#'+api.transferKeyS2C(key)).find('p').text(value);
	$('#'+api.transferKeyS2C(key)).find('input').val(value);
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
		 	console.log("EDIT Machine Info res: ", data); 
		 })
		 .fail(function(err) { 
		 	console.log("EDIT Machine Info error: ", err);
		 	// if fail restore old page
		 	$.each(backupJdata, fillList);
		  });
}



function deleteWorkOrderInfo() {
	api.deleteWorkOrder(workorderID)
		 .done(function(data) { 
		 	console.log("DELETE Machine res: ", data); 
		 	//back to list
		 	api.goToWorkOrderIndex();
		})
		 .fail(function(err) { 
		 	console.log("DELETE Machine error: ", err);
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
			var selectedName  = $dropdownSelected.attr('name');
			var selectedValue = $dropdownSelected.text();
			newData[selectedName] = selectedValue;

		} else {
			console.log('getChangedData error: missing some value');
		}
	});
	return newData;
}