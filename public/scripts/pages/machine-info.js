'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var queryParameter = require('../lib/helper/query-parameter');

require('bootstrap/js/dropdown');
var noticeedPersonDropdown = require('../machine/modules/noticed-person-dropdown');
var checkPeriodDropdown    = require('../machine/modules/check-period-dropdown');
var maintainPeriodDropdown = require('../machine/modules/maintain-period-dropdown');

require('eonasdan-bootstrap-datetimepicker');
var errorRecordTable = require('../machine/modules/error-record-table');


/* DOM */
var $editBtn   = $('#machine-edit-button');
var $cancelBtn = $('#machine-cancel-button');
var $saveBtn   = $('#machine-save-button');
var $deleteBtn = $('#machine-delete-button');
var $backBtn   = $('#machine-back-button');
var $machineDetailPage  = $('#machine-detail-page');
var $viewModeCollection = $machineDetailPage.find('.view-mode');
var $editModeCollection = $machineDetailPage.find('.edit-mode');

var $id = $('#machine-id');
var $name = $('#machine-name');
var $weight = $('#machine-weight');
// TODO: 機台稼動率

// TODO: 小保養紀錄
// TODO: 大保養紀錄
// TODO: 異常維修紀錄

var isEditMode   = false;
var isCreateMode = false;
var machineId;
var originalData;


initialize();

function initialize() {
	header.include();
	if (queryParameter.get('new') === 'true') {
		isCreateMode = true;
		showCreateMode();
	}
	getInitialData();
	bindEvents();
}

function getInitialData() {
	machineId = queryParameter.get('ID');
	api.getMachineInfo(machineId)
		 .done(initialView)
		 .fail(function(err) { console.log("GET Machine Info error: ", err); });
	// var fakeResponse ={"id":1,"name":"Fritsch","weight":516,"acquisition":"1991-07-09 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":42,"maintain_period_unit":"times","maintain_period_value":10,"created_at":"2015-08-17 11:56:02","updated_at":"2015-08-17 11:56:02","maintain_records":[{"id":1,"machine_id":1,"type":"maintain","content":"test","created_at":"2015-08-17 11:56:02","updated_at":"2015-08-17 11:56:02"},{"id":2,"machine_id":1,"type":"check","content":"test","created_at":"2015-08-17 11:56:02","updated_at":"2015-08-17 11:56:02"},{"id":3,"machine_id":1,"type":"check","content":"test","created_at":"2015-08-17 11:56:02","updated_at":"2015-08-17 11:56:02"}]};
	// initialView(fakeResponse);
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteMachine);
	$backBtn  .on('click', api.goToMachineIndex);
	$machineDetailPage.submit(saveData);
}

function showEditMode() {
	isEditMode = true;
	$editBtn  .hide();
	$cancelBtn.show();
	$saveBtn  .show();
	$deleteBtn.hide();
	$backBtn  .hide();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
	errorRecordTable.setEditMode(true);
}

function hideEditMode() {
	isEditMode = false;
	resetViewData();
	$editBtn  .show();
	$cancelBtn.hide();
	$saveBtn  .hide();
	$deleteBtn.show();
	$backBtn  .show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
	errorRecordTable.setEditMode(false);
}

function showCreateMode() {
	$editBtn  .hide();
	$cancelBtn.hide();
	$saveBtn  .show();
	$deleteBtn.hide();
	$backBtn  .show();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
	errorRecordTable.setEditMode(true);
}

function saveData() {
	var data = getChangedData();

	if (isEditMode && !isCreateMode) {
		saveChangedData(data);
		console.log('Changed Data : ', data);

	} else if (!isEditMode && isCreateMode) {
		saveNewData(data);
		console.log('New Data : ', data);

	} else {
		console.log('machine info page has error: Undefined Mode');
	}
	return false;
}

function saveChangedData(data) {
	api.editMachineInfo(machineId, data)
		 .done(function(data) { console.log("EDIT Machine Info res: ", data); })
		 .fail(function(err) { console.log("EDIT Machine Info error: ", err); });
}

function saveNewData(data) {
	api.createMachine(data)
		 .done(function(data) { console.log("CREATE Machine res: ", data); })
		 .fail(function(err) { console.log("CREATE Machine error: ", err); });
}

function deleteMachine() {
	api.deleteMachine(machineId)
		 .done(function(data) { console.log("DELETE Machine res: ", data); })
		 .fail(function(err) { console.log("DELETE Machine error: ", err); });
}

function initialView(data) {
	originalData = data;
	initBaseInfo(data);
	initResumeInfo(data);
}

function resetViewData() {
	initBaseInfo(originalData);
	initResumeInfo(originalData);
}

function initBaseInfo(data) {
	$id.find('.view-mode').text(data['id']);
	$id.find('.edit-mode').val(data['id']);

	$name.find('.view-mode').text(data['name']);
	$name.find('.edit-mode').val(data['name']);

	$weight.find('.view-mode').text(data['weight']);
	$weight.find('.edit-mode').val(data['weight']);

	// TODO: 機台稼動率
}

function initResumeInfo(data) {
	noticeedPersonDropdown.init(data['admin_id']);
	checkPeriodDropdown   .init(data['check_period_value'], data['check_period_unit']);
	maintainPeriodDropdown.init(data['maintain_period_value'], data['maintain_period_unit']);
	// TODO: 小保養紀錄
	// TODO: 大保養紀錄
	// TODO: 異常維修紀錄
	errorRecordTable.init();
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
	newData['check_period_value']    = checkPeriodDropdown.getValue();
	newData['check_period_unit']     = checkPeriodDropdown.getType();
	newData['maintain_period_value'] = maintainPeriodDropdown.getValue();
	newData['maintain_period_unit']  = maintainPeriodDropdown.getType();
	return newData;
}