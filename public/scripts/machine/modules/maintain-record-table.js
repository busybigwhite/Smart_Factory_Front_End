'use strict';

var $ = window.jQuery = require('jquery');
var template = require('../templates/record-list-template');
require('eonasdan-bootstrap-datetimepicker');

/* DOM */
var $recordTable        = $('#maintain-record-table');
var $tableHeader        = $recordTable.find('.record-header');
var $tableBody          = $('#maintain-record-table-body');
var $changedTable       = $('#maintain-record-changed-table-body');
var $lastTable       	= $('#maintain-record-last-table-body');
var $recordForm         = $('#maintain-record-form');
var $datePicker         = $('#maintain-record-date-picker');
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
		ignoreReadonly: true,
		sideBySide: true,
	};

exports = module.exports = {
	init: initialize,
	initialView: initialView,
	getNewList: getNewList,
	getDeleteList: getDeleteList,
	setEditMode: setEditMode,
	clearChangedTable: clearChangedTable,
};


function initialize() {
	bindEvents();
	initializeDatetimePicker();
	$lastTable.show();
}

function initialView(data) {
	if (data) {
		var tableListRows = template.render({ records : data });
		$tableBody.empty().append( tableListRows );

		if (data.length > 1) {
			var tableOneRow = template.render({ records : [data[data.length-1]] });
			$lastTable.empty().append( tableOneRow );
		} else {
			var tableOneRow = template.render({ records : data });
			$lastTable.empty().append( tableOneRow );
		}
	}
}

function bindEvents() {
	$tableHeader.on('click', toggleTable);
	$addRecordBtn.on('click', addRecordListView);
	$clearInputBtn.on('click', clearInput);
	$changedTable.on('click', '.record-delete-button', removeNewRecord);
	$tableBody.on('click', '.record-delete-button', deleteRecord);
	// $contentInput.on('keypress', contentInputPressed);
}

function getNewList() {
	var data = [];
	var $lists = $changedTable.find('.record-list').filter('.new');
	$lists.each(function(i, el) {
		data.push($(el).data('record'));
	});
	return data;
}

function getDeleteList() {
	var data = [];
	var $lists = $changedTable.find('.record-list').filter('.delete');
	$lists.each(function(i, el) {
		data.push($(el).data('record'));
	});
	return data;
}
function initializeDatetimePicker() {
	$datePicker.datetimepicker(dateTimePickerOpt);
	$datePicker.data("DateTimePicker").defaultDate(today);
}

function setEditMode(boolean) {
	boolean ? showEditModeTable() : hideEditModeTable();
}

function showEditModeTable() {
	$recordForm.show();
	$changedTable.addClass('editting');
	$tableBody.addClass('editting');
}

function hideEditModeTable() {
	$recordForm.hide();
	$changedTable.removeClass('editting');
	$tableBody.removeClass('editting');
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
	$lastTable.hide();
}

function closeTable() {
	$tableHeader.removeClass('open');
	$tableBody.hide();
	$lastTable.show();
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
	clearInput();
}

function getFormData() {
	var data = {};
	data.created_at = $datePicker.val();
	data.content = $contentInput.val();
	data.type = 'maintain';
	data.updated_at = $datePicker.val();
	return data.content ? data : false ;
}

// function contentInputPressed(e) {
// 	console.log('contentInputPressed');
// 	if (e.keyCode === 13 && !e.target.value) {
// 		console.log('contentInputPressed:',e);
// 		addRecordListView();
// 	}
// 	e.stopPropagation();
// }

function removeNewRecord() {
	$(this).closest('.record-list').remove();
}

function deleteRecord() {
	var $beDeleteItem = $(this).closest('.record-list');
	$beDeleteItem.addClass('delete');
	$changedTable.prepend($beDeleteItem);
}
