'use strict';

var $ = window.jQuery = require('jquery');
var api = require('../api');
var template = require('../templates/record-list-template');

/* DOM */
var $recordTable        = $('#error-record-table');
var $tableHeader        = $recordTable.find('.record-header');
var $tableBody          = $('#error-record-table-body');
// var $deleteBtn          = $tableBody.find('.record-delete-button');
var $changedTable       = $('#error-record-changed-table-body');
// var $removeNewRecordBtn = $changedTable.find('.record-delete-button');
var $recordForm         = $('#error-record-form');
var $datePicker         = $('#error-record-date-picker');
var $contentInput       = $recordForm.find('.record-content-input');
var $addRecordBtn       = $recordForm.find('.record-new-button');
var $clearInputBtn      = $recordForm.find('.record-cancel-button');

var today = new Date();
var dateTimePickerOpt = {
		widgetPositioning: {
			horizontal: 'auto',
			vertical: 'bottom'
		},
		maxDate: today,
		ignoreReadonly: true
	};

exports = module.exports = {
	init: initialize,
	setEditMode: setEditMode,
	clearChangedTable: clearChangedTable,
};


function initialize() {
	initialView();
	bindEvents();
	initializeDatetimePicker();
}

function initialView() {
	var tableListRows = template.render({ records : api.getErrorRecord() });
	$tableBody.empty().append( tableListRows );
}

function bindEvents() {
	$tableHeader.on('click', toggleTable);
	$addRecordBtn.on('click', addRecordListView);
	$clearInputBtn.on('click', clearInput);
	// $deleteBtn.on('click', deleteRecord);
	$changedTable.on('click', '.record-delete-button', removeNewRecord);
	$tableBody.on('click', '.record-delete-button', deleteRecord);
}

function initializeDatetimePicker() {
	$datePicker.datetimepicker(dateTimePickerOpt);
	$datePicker.data("DateTimePicker").defaultDate(today);
}

function setEditMode(boolean) {
	boolean ? $recordForm.show() : $recordForm.hide();
}

function clearChangedTable() {
	$changedTable.empty();
}

function toggleTable() {
	$tableHeader.hasClass('open') ? closeTable() : openTable();
}

function openTable() {
	$tableHeader.addClass('open');
	$tableBody.show();
}

function closeTable() {
	$tableHeader.removeClass('open');
	$tableBody.hide();
}

function clearInput() {
	$contentInput.val('');
}

function addRecordListView() {
	var data = getFormData();
	console.log('getFormData : ', data);
	if (!data) return;
	var tableListRows = template.renderNewOne({ record : data });
	$changedTable.append( tableListRows );
}

function getFormData() {
	var data = {};
	data.date = $datePicker.val();
	data.content = $contentInput.val();
	return data.content ? data : false ;
}

function removeNewRecord() {
	$(this).closest('.record-list').remove();
}

function deleteRecord() {
	var $beDeleteItem = $(this).closest('.record-list');
	$beDeleteItem.addClass('delete');
	$changedTable.prepend($beDeleteItem);
}
