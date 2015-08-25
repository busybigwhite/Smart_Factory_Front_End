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
		 .fail(function(err) { console.log("GET Machine List error: ", err); });
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
	var machineList = data;

	clearTableList();
	for (var i = 0 ; i < machineList.length; i++) {
		getNextAvailabilityRateThenRenderList(machineList[i]);
	}
}

function getNextAvailabilityRateThenRenderList(list) {
	api.getAvailabilityRate(list.id).done(function(result) {
		list.availability_rate = result.availability_rate;
		renderView(list);
	});
}

function getAvailabilityRateArray(idArray) {
	var aArray = idArray.map(function(id) {
		return api.getAvailabilityRate(id);
	});
	return aArray;
}

function clearTableList() {
	$machineTableBody.empty();
}

function renderView(array) {
	var tableListRows = template.render({ infos : array});
	$machineTableBody.append( tableListRows );
}