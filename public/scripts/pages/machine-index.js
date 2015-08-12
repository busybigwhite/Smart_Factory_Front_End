'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');

/* DOM */
var $machineNewBtn = $('#machine-new-button');
var $machineTbody = $('#machine-tbody');

initialize();

function initialize() {
	header.include();
	bindEvents();
}

function bindEvents() {
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTbody.on('click', '.detail-info-button', gotoMachineDetailInfoPage);
}

function gotoMachineNewInfoPage() {
	window.location.href = config.machineUrl + 'new';
}

function gotoMachineDetailInfoPage() {
	var ID = $(this).data('id');
	window.location.href = config.machineUrl + 'info?ID=' + ID;
}