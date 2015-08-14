'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');
var api = require('../machine/api');

/* DOM */
var $machineNewBtn = $('#machine-new-button');
var $machineTable = $('#machine-table');

initialize();

function initialize() {
	header.include();
	getInitialData();
	bindEvents();
}

function getInitialData() {
	// TODO
}

function bindEvents() {
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTable.on('click', '.detail-info-button', gotoMachineDetailInfoPage);
}

function gotoMachineNewInfoPage() {
	api.goToMachineInfo('new');
}

function gotoMachineDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMachineInfo('detail', ID);
}