'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

/* DOM */
var $machineDeleteBtn = $('#machine-delete-button');
var $machineEditBtn = $('#machine-edit-button');
var $machineCancelBtn = $('#machine-cancel-button');
var $machineSaveBtn = $('#machine-save-button');
var $machineDetailPage = $('#machine-detail-page');
var $viewModeCollection = $machineDetailPage.find('.view-mode');
var $editModeCollection = $machineDetailPage.find('.edit-mode');

var isEditMode = false;

exports.init = initialize;

function initialize() {
	console.log('machine info init');
	bindEvents();
}

function bindEvents() {
	$machineDeleteBtn.on('click', deleteMachine);
	$machineEditBtn.on('click', showEditMode);
	$machineCancelBtn.on('click', hideEditMode);
	$machineSaveBtn.on('click', saveChangedData);
}

function showEditMode() {
	isEditMode = true;
	$machineDeleteBtn.hide();
	$machineEditBtn.hide();
	$machineSaveBtn.show();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function hideEditMode() {
	isEditMode = false;
	$machineDeleteBtn.show();
	$machineEditBtn.show();
	$machineSaveBtn.hide();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
}

function deleteMachine() {
	// TODO
}