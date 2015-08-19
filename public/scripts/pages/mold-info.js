'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../mold/api');
var queryParameter = require('../lib/helper/query-parameter');

var noticeedPersonDropdown = require('../mold/modules/noticed-person-dropdown');
var checkPeriodDropdown    = require('../mold/modules/check-period-dropdown');
var maintainPeriodDropdown = require('../mold/modules/maintain-period-dropdown');

var checkRecordTable    = require('../mold/modules/check-record-table');
var maintainRecordTable = require('../mold/modules/maintain-record-table');
var errorRecordTable    = require('../mold/modules/error-record-table');


/* DOM */
var $editBtn   = $('#mold-edit-button');
var $cancelBtn = $('#mold-cancel-button');
var $saveBtn   = $('#mold-save-button');
var $deleteBtn = $('#mold-delete-button');
var $backBtn   = $('#mold-back-button');
var $moldDetailPage  = $('#mold-detail-page');
var $viewModeCollection = $moldDetailPage.find('.view-mode');
var $editModeCollection = $moldDetailPage.find('.edit-mode');

var $serialNumber = $('#mold-serial-num');
var $name = $('#mold-name');
var $weight = $('#mold-weight');


var isEditMode   = false;
var isCreateMode = false;
var moldId;
var originalData;


initialize();

function initialize() {
	header.include();
	if (queryParameter.get('new') === 'true') {
		isCreateMode = true;
		showCreateMode();
	}
	moldId = queryParameter.get('ID');
	api.setFactoryId(queryParameter.get('factoryId'));
	getInitialData();
	bindEvents();

	noticeedPersonDropdown.init();
	checkRecordTable.init();
	maintainRecordTable.init();
	errorRecordTable.init();
}

function getInitialData() {
	if (!moldId) return;
	api.getMoldInfo(moldId)
		 .done(initialView)
		 .fail(function(err) { console.log("GET Mold Info error: ", err); });
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteMold);
	$backBtn  .on('click', api.goToMoldIndex);
	$moldDetailPage.on('keypress', 'input', preventSubmitOnInputEnter);
	$moldDetailPage.submit(saveData);
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
	checkPeriodDropdown.setDefaultType();
	maintainPeriodDropdown.setDefaultType();
	noticeedPersonDropdown.setDefault();
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
		console.log('mold info page has error: Undefined Mode');
	}
	return false;
}

function saveChangedData(data) {
	api.editMoldInfo(moldId, data)
		 .done(function(data) { console.log("EDIT Mold Info res: ", data); })
		 .fail(function(err) { console.log("EDIT Mold Info error: ", err); });
}

function saveNewData(data) {
	api.createMold(data)
		 .done(function(data) { console.log("CREATE Mold res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold error: ", err); });
}

function saveNewRecord(data) {
	api.createMoldRecord(moldId, data)
		 .done(function(data) { console.log("CREATE Mold Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
}

function saveDeleteRecord(data) {
	api.deleteMoldRecord(moldId, data)
		 .done(function(data) { console.log("CREATE Mold Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
}


function deleteMold() {
	api.deleteMold(moldId)
		 .done(function(data) { console.log("DELETE Mold res: ", data); })
		 .fail(function(err) { console.log("DELETE Mold error: ", err); });
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
}

function initResumeInfo(data) {
	// ToFix: admin_name
	noticeedPersonDropdown.setNoticeedPerson(data['admin_id'], 'default name');
	checkPeriodDropdown   .init(data['check_period_value'], data['check_period_unit']);
	maintainPeriodDropdown.init(data['maintain_period_value'], data['maintain_period_unit']);

	// ToFix: 小保養紀錄 init data
	var fakedata = [{id: '1', created_at: '2015-08-17', type: 'check', content: 'test1'},{id: '1', created_at: '2015-08-17', type: 'check', content: 'test2'}];
	checkRecordTable.initialView(fakedata);

	console.log("data['maintain_records'] : ", data['maintain_records']);
	maintainRecordTable.initialView(data['maintain_records']);

	// ToFix: 異常維修紀錄 init data
	var fakedata = [{id: '1', created_at: '2015-08-17', type: 'error', content: 'test1'},{id: '1', created_at: '2015-08-17', type: 'error', content: 'test2'}];
	errorRecordTable.initialView(fakedata);
}

function getAllInfoData() {
	var data = {};
	data.info = getInfoValue();
	data.newRecords = getNewRecordList();
	data.deleteRecords = getDeleteRecordList();
	return data;
}

function getInfoValue() {
	var data = {};
	$editModeCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();

		if (name) {
			value = value ? value : '';
			data[name] = value;
		}
	});
	data['admin_id']  = noticeedPersonDropdown.getId();
	data['check_period_value']    = checkPeriodDropdown.getValue();
	data['check_period_unit']     = checkPeriodDropdown.getType();
	data['maintain_period_value'] = maintainPeriodDropdown.getValue();
	data['maintain_period_unit']  = maintainPeriodDropdown.getType();
	return data;
}

function getNewRecordList() {
	var data = {};
	data.check    = addMoldIdIntoData(checkRecordTable.getNewList());
	data.maintain = addMoldIdIntoData(maintainRecordTable.getNewList());
	data.error    = addMoldIdIntoData(errorRecordTable.getNewList());
	return data;
}

function getDeleteRecordList() {
	var data = {};
	data.check    = addMoldIdIntoData(checkRecordTable.getDeleteList());
	data.maintain = addMoldIdIntoData(maintainRecordTable.getDeleteList());
	data.error    = addMoldIdIntoData(errorRecordTable.getDeleteList());
	return data;
}

function addMoldIdIntoData(array) {
	return array.map(function(el, i) {
		el.mold_id = moldId;
		return el;
	});
}
