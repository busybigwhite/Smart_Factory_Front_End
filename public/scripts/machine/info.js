'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
require('bootstrap/js/dropdown');

/* DOM */
var $editBtn   = $('#machine-edit-button');
var $cancelBtn = $('#machine-cancel-button');
var $saveBtn   = $('#machine-save-button');
var $deleteBtn = $('#machine-delete-button');
var $machineDetailPage  = $('#machine-detail-page');
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
	$editBtn.on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$saveBtn.on('click', saveChangedData);
	$deleteBtn.on('click', deleteMachine);
}

function showEditMode() {
	isEditMode = true;
	$editBtn.hide();
	$saveBtn.show();
	$deleteBtn.hide();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
}

function hideEditMode() {
	isEditMode = false;
	$editBtn.show();
	$saveBtn.hide();
	$deleteBtn.show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
}

function saveChangedData() {
	// TODO
}

function deleteMachine() {
	// TODO
}