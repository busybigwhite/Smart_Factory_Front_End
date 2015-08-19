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
var workorderID = $('#workorder-num span').text();

initialize();

function initialize() {
	// workorderID = GET FROM LIST
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
	console.log("show edit");
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
		console.log("hide edit");
		isEditMode = false;
		$editBtn  .show();
		$cancelBtn.show();
		$saveBtn  .hide();
		$deleteBtn.show();
		$viewModeCollection.removeClass('editting');
		$editModeCollection.removeClass('editting');
	}else{
		window.location="./";
		// api.goToWorkOrderIndex();
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
}

function saveData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);
	//if update success refresh layout
	saveChangedData(data);
	return false;
}

function saveChangedData(data) {
	api.editWorkOrderInfo(workorderID, data)
		 .done(function(data) { console.log("EDIT Machine Info res: ", data); })
		 .fail(function(err) { console.log("EDIT Machine Info error: ", err); });
}



function deleteWorkOrderInfo() {
	api.deleteWorkOrder(workorderID)
		 .done(function(data) { console.log("DELETE Machine res: ", data); })
		 .fail(function(err) { console.log("DELETE Machine error: ", err); });
}


function getChangedData() {
	var newData = {};
	$editModeCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();
		var $dropdownSelected = $(el).find('.selected-option');

		if (name) {
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