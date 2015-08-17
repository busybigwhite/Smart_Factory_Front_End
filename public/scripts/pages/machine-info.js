'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var queryParameter = require('../lib/helper/query-parameter');

require('bootstrap/js/dropdown');
var noticeedPersonDropdown = require('../machine/modules/noticed-person-dropdown');
var checkPeriodDropdown    = require('../machine/modules/check-period-dropdown');
var maintainPeriodDropdown = require('../machine/modules/maintain-period-dropdown');

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
	// var fakeArray = [{"id":1,"name":"Hoeger","weight":768,"acquisition":"2008-09-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":2,"name":"O'Connell","weight":753,"acquisition":"1994-07-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":3,"name":"Steuber","weight":473,"acquisition":"1997-10-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":4,"name":"Hettinger","weight":349,"acquisition":"1996-08-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":5,"name":"Swift","weight":591,"acquisition":"1996-10-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":6,"name":"Waelchi","weight":694,"acquisition":"2012-10-02 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":7,"name":"Braun","weight":862,"acquisition":"1994-08-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":8,"name":"Bernier","weight":953,"acquisition":"1996-10-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":9,"name":"Zboncak","weight":646,"acquisition":"2002-11-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":10,"name":"Hartmann","weight":681,"acquisition":"2000-07-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"}];
	// var fakeResponse;
	// fakeArray.map(function(obj) {
	// 	if ((obj.id + '') === machineId) fakeResponse = obj;
	// });
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
}

function hideEditMode() {
	isEditMode = false;
	$editBtn  .show();
	$cancelBtn.hide();
	$saveBtn  .hide();
	$deleteBtn.show();
	$backBtn  .show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
}

function showCreateMode() {
	$editBtn  .hide();
	$cancelBtn.hide();
	$saveBtn  .show();
	$deleteBtn.hide();
	$backBtn  .show();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function saveData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);

	if (isEditMode && !isCreateMode) {
		saveChangedData(data);

	} else if (!isEditMode && isCreateMode) {
		saveNewData(data);

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
	initBaseInfo(data);
	initResumeInfo(data);
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
	// ToFix: data type params
	checkPeriodDropdown   .init(data['check_period'], '天');
	maintainPeriodDropdown.init(data['maintain_period'], '年');
	// TODO: 小保養紀錄
	// TODO: 大保養紀錄
	// TODO: 異常維修紀錄
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