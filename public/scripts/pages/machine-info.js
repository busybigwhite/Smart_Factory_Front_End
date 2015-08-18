'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var queryParameter = require('../lib/helper/query-parameter');

// ToFix: default option
require('bootstrap/js/dropdown');
var noticeedPersonDropdown = require('../machine/modules/noticed-person-dropdown');
var checkPeriodDropdown    = require('../machine/modules/check-period-dropdown');
var maintainPeriodDropdown = require('../machine/modules/maintain-period-dropdown');

require('eonasdan-bootstrap-datetimepicker');
var checkRecordTable    = require('../machine/modules/check-record-table');
var maintainRecordTable = require('../machine/modules/maintain-record-table');
var errorRecordTable    = require('../machine/modules/error-record-table');


/* DOM */
var $editBtn   = $('#machine-edit-button');
var $cancelBtn = $('#machine-cancel-button');
var $saveBtn   = $('#machine-save-button');
var $deleteBtn = $('#machine-delete-button');
var $backBtn   = $('#machine-back-button');
var $machineDetailPage  = $('#machine-detail-page');
var $viewModeCollection = $machineDetailPage.find('.view-mode');
var $editModeCollection = $machineDetailPage.find('.edit-mode');

var $serialNumber = $('#machine-serial-num');
var $name = $('#machine-name');
var $weight = $('#machine-weight');
// TODO: 機台稼動率


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
	checkRecordTable.init();
	maintainRecordTable.init();
	errorRecordTable.init();
}

function getInitialData() {
	machineId = queryParameter.get('ID');
	api.getMachineInfo(machineId)
		 .done(initialView)
		 .fail(function(err) { console.log("GET Machine Info error: ", err); });
	// var fakeResponse ={"id":2,"serial_num":"Helga","name":"Schmidt","weight":187,"acquisition":"1991-06-10 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":62,"maintain_period_unit":"times","maintain_period_value":85,"created_at":"2015-08-18 06:57:31","updated_at":"2015-08-18 06:57:31","maintain_records":[{"id":1,"machine_id":2,"type":"maintain","content":"test","created_at":"2015-08-18 06:57:31","updated_at":"2015-08-18 06:57:31"}]};
	// initialView(fakeResponse);
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteMachine);
	$backBtn  .on('click', api.goToMachineIndex);
	$machineDetailPage.on('keypress', 'input', preventSubmitOnInputEnter);
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
	checkRecordTable.setEditMode(true);
	maintainRecordTable.setEditMode(true);
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
	checkRecordTable.setEditMode(false);
	maintainRecordTable.setEditMode(false);
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
	checkRecordTable.setEditMode(true);
	maintainRecordTable.setEditMode(true);
	errorRecordTable.setEditMode(true);
}

function preventSubmitOnInputEnter(e) {
	var code = e.keyCode || e.which;
	if (code === 13) {
	  e.preventDefault();
	  return false;
	}
}

function saveData() {
	var data = getAllInfoData();
	console.log(data);
	if (isEditMode && !isCreateMode) {
		saveChangedData(data.info);
		saveNewRecord(data.newRecords);
		saveDeleteRecord(data.deleteRecords);
		console.log('Changed Data : ', data);

	} else if (!isEditMode && isCreateMode) {
		saveNewData(data.info);
		saveNewRecord(data.newRecords);
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

function saveNewRecord(data) {
	api.createMachineRecord(data)
		 .done(function(data) { console.log("CREATE Machine Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Machine Record error: ", err); });
}

function saveDeleteRecord(data) {
	api.deleteMachineRecord(data)
		 .done(function(data) { console.log("CREATE Machine Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Machine Record error: ", err); });
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
	$serialNumber.find('.view-mode').text(data['serial_num']);
	$serialNumber.find('.edit-mode').val(data['serial_num']);

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

	// ToFix: 小保養紀錄 init data
<<<<<<< HEAD
	var fakedata = [{id: '1', created_at: '2015-08-17', type: 'check', content: 'test1'},{id: '1', created_at: '2015-08-17', type: 'check', content: 'test2'}];
=======
	var fakedata = api.getErrorRecord();
>>>>>>> ccbb3a6b9e0b05d547532276293326817e82f743
	checkRecordTable.initialView(fakedata);

	console.log("data['maintain_records'] : ", data['maintain_records']);
	maintainRecordTable.initialView(data['maintain_records']);

	// ToFix: 異常維修紀錄 init data
<<<<<<< HEAD
	var fakedata = [{id: '1', created_at: '2015-08-17', type: 'error', content: 'test1'},{id: '1', created_at: '2015-08-17', type: 'error', content: 'test2'}];
	errorRecordTable.initialView(fakedata);
}

function getAllInfoData() {
	var data = {};
	data.info = getInputValue();
	data.newRecords = getNewRecordList();
	data.deleteRecords = getDeleteRecordList();
	return data;
=======
	var fakedata = api.getErrorRecord();
	errorRecordTable.initialView(fakedata);
>>>>>>> ccbb3a6b9e0b05d547532276293326817e82f743
}

function getInputValue() {
	var data = {};
	$editModeCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();

		if (name) {
			value = value ? value : '';
			data[name] = value;
		}
	});
	data['check_period_value']    = checkPeriodDropdown.getValue();
	data['check_period_unit']     = checkPeriodDropdown.getType();
	data['maintain_period_value'] = maintainPeriodDropdown.getValue();
	data['maintain_period_unit']  = maintainPeriodDropdown.getType();
	return data;
}

function getNewRecordList() {
	var data = {};
	data.check    = addMachineIdIntoData(checkRecordTable.getNewList());
	data.maintain = addMachineIdIntoData(maintainRecordTable.getNewList());
	data.error    = addMachineIdIntoData(errorRecordTable.getNewList());
	return data;
}

function getDeleteRecordList() {
	var data = {};
	data.check    = addMachineIdIntoData(checkRecordTable.getDeleteList());
	data.maintain = addMachineIdIntoData(maintainRecordTable.getDeleteList());
	data.error    = addMachineIdIntoData(errorRecordTable.getDeleteList());
	return data;
}

function addMachineIdIntoData(array) {
	return array.map(function(el, i) {
		el.machine_id = machineId;
		return el;
	});
}
