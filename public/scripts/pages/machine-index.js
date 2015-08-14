'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var template = require('../machine/templates/index-list-template');

/* DOM */
var $machineNewBtn    = $('#machine-new-button');
var $machineTable     = $('#machine-table');
var $machineTableBody = $('#machine-table-body');

initialize();

function initialize() {
	header.include();
	getInitialData();
	bindEvents();
}

function getInitialData() {
	api.getMachineList()
		 .done(initialView)
		 .fail(function(err) { console.log("GET Machine Info error: ", err); });
	// var fakeResponse = [{"id":"1","factory_id":"1","name":"\u6e2c\u8a66\u6a5f\u578b01","weight":"10"},{"id":"2","factory_id":"1","name":"\u6e2c\u8a66\u6a5f\u578b02","weight":"20"}];
	// initialView(fakeResponse);
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

function initialView(data) {
	var tableListRows = template.render({ infos : data });
	$machineTableBody.empty().append( tableListRows );
}