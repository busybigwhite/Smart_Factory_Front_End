'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var template = require('../machine/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');

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
	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	api.setFactoryId(ID);
	api.getMachineList()
		 .done(initialView)
		 .fail(function(err) { console.log("GET Machine Info error: ", err); });
}

function bindEvents() {
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTable.on('click', '.detail-info-button', gotoMachineDetailInfoPage);
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
}

function gotoMachineNewInfoPage() {
	api.goToMachineInfo('new', {factoryId: getFactoryId()});
}

function gotoMachineDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMachineInfo('detail', {factoryId: getFactoryId(), ID: ID});
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

function initialView(data) {
	var tableListRows = template.render({ infos : data });
	$machineTableBody.empty().append( tableListRows );
}