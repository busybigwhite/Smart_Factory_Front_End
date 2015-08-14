'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');

/* DOM */
var $machineNewBtn = $('#machine-new-button');
var $machineTable = $('#machine-table');

initialize();

function initialize() {
	header.include();
	// info.init();
	// getInitialData();
	// bindEvents();
}

function getInitialData() {
	var fakeResponse = {"id":"1","name":"\u6e2c\u8a66\u6a5f\u578b01","weight":"10","date":"2015\/08\/14 14:00:00","acquisition_date":"2015\/08\/15 14:00:00","admin_id":"U0001","check_period":"3","maintain_period":"10"};
	initialView(fakeResponse);
}

function bindEvents() {
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTable.on('click', '.detail-info-button', gotoMachineDetailInfoPage);
}