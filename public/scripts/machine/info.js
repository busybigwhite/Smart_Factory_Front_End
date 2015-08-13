'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var api = require('../machine/api');
var queryParameter = require('../lib/helper/query-parameter');
require('bootstrap/js/dropdown');

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

var $noticedPerson = $('#machine-noticed-person');
var $noticedPersonDropdown = $('#machine-notice-dropdown');

var $checkPeriod = $('#machine-check-period');
var $checkPeriodDropdown = $('#machine-check-period-dropdown');
// TODO: 小保養紀錄

var $maintainPeriod = $('#machine-maintain-period');
var $maintainPeriodDropdown = $('#machine-maintain-period-dropdown');
// TODO: 大保養紀錄
// TODO: 異常維修紀錄


var isEditMode = false;


exports.init = initialize;

function initialize() {
	console.log('machine info init');
	getInitialData();
	bindEvents();
}

function getInitialData() {
	/* temp comment, hasn't test
	 var machineId = queryParameter.get('ID');
	 var res = api.getMachineInfo(machineId);
	*/
	var fakeResponse = {"id":"1","name":"\u6e2c\u8a66\u6a5f\u578b01","weight":"10","date":"2015\/08\/14 14:00:00","acquisition_date":"2015\/08\/15 14:00:00","admin_id":"U0001","check_period":"3","maintain_period":"10"};
	initialView(fakeResponse);
}

function bindEvents() {
	$editBtn.on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$saveBtn.on('click', saveChangedData);
	$deleteBtn.on('click', deleteMachine);
	$backBtn.on('click', goToMachineIndex);
}

function showEditMode() {
	isEditMode = true;
	$editBtn.hide();
	$cancelBtn.show();
	$saveBtn.show();
	$deleteBtn.hide();
	$backBtn.hide();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function hideEditMode() {
	isEditMode = false;
	$editBtn.show();
	$cancelBtn.hide();
	$saveBtn.hide();
	$deleteBtn.show();
	$backBtn.show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
}

function saveChangedData() {
	// TODO
}

function deleteMachine() {
	// TODO
}

function goToMachineIndex() {
	window.location.href = config.machineUrl;
}

function initialView(data) {
	initBaseInfo(data);
	initNoticeedPerson(data['admin_id']);
	// ToFix: data type params
	initCheckPeriod(data['check_period'], '天');
	initMaintainPeriod(data['maintain_period'], '年');
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

function initNoticeedPerson(id) {
	$noticedPerson.find('.view-mode').text(id);
	$noticedPersonDropdown.find('.selected-option').text(id);
}

function initCheckPeriod(val, type) {
	$checkPeriod.find('.view-mode').eq(0).text(val);
	$checkPeriod.find('.view-mode').eq(1).text(type);
	$checkPeriod.find('.edit-mode').eq(0).val(val);
	$checkPeriodDropdown.find('.selected-option').text(type);
}

function initMaintainPeriod(val, type) {
	$maintainPeriod.find('.view-mode').eq(0).text(val);
	$maintainPeriod.find('.view-mode').eq(1).text(type);
	$maintainPeriod.find('.edit-mode').eq(0).val(val);
	$maintainPeriodDropdown.find('.selected-option').text(type);
}
