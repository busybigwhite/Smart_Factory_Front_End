'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

/* DOM */
var $deleteBtn = $('#machine-delete-button');
var $editBtn = $('#machine-edit-button');
var $cancelBtn = $('#machine-cancel-button');
var $saveBtn = $('#machine-save-button');
var $machineDetailPage = $('#machine-detail-page');
var $viewModeCollection = $machineDetailPage.find('.view-mode');
var $editModeCollection = $machineDetailPage.find('.edit-mode');

var isEditMode = false;

exports.init = initialize;

function initialize() {
	console.log('machine info init');
	getInitialData();
	bindEvents();
}

function getInitialData() {
	// TODO
}

function bindEvents() {
	$deleteBtn.on('click', deleteMachine);
	$editBtn.on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$saveBtn.on('click', saveChangedData);
}

function showEditMode() {
	isEditMode = true;
	$deleteBtn.hide();
	$editBtn.hide();
	$saveBtn.show();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function hideEditMode() {
	isEditMode = false;
	$deleteBtn.show();
	$editBtn.show();
	$saveBtn.hide();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
}

function deleteMachine() {
	// TODO
}

function saveChangedData() {
	// TODO
}