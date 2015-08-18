'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

var machineApiUrl  = config.APIUrl + 'machine/';
var machinePageUrl = config.machineUrl;

exports = module.exports = {
	goToMachineIndex: goToMachineIndex,
	goToMachineInfo: goToMachineInfo,
	getMachineList: getMachineList,
	createMachine: createMachine,
	deleteMachine: deleteMachine,
	getMachineInfo: getMachineInfo,
	editMachineInfo: editMachineInfo,
	createMachineRecord: createMachineRecord,
	deleteMachineRecord: deleteMachineRecord,
};

function goToMachineIndex() {
	window.location.href = machinePageUrl;
}

function goToMachineInfo(type, ID) {
	var action = '';
	switch(type) {
		case 'new':
			action = '?new=true';
		break;

		case 'detail':
		default:
			action = '?ID=' + ID;
	}
	window.location.href = machinePageUrl + 'info' + action;
}

function getMachineList(id) {
	return getData(machineApiUrl + 'list', id);
};

function createMachine(data) {
	return createData(machineApiUrl, data);
}

function deleteMachine(id) {
	return deleteData(machineApiUrl + id);
}

function getMachineInfo(id) {
	return getData(machineApiUrl + id);
};

function editMachineInfo(id, data) {
	return editData(machineApiUrl + id, data);
}

function createMachineRecord(id, data) {
	// TODO:
	// return createData(machineApiUrl, data);
}

function deleteMachineRecord(id, data) {
	// TODO:
	// return deleteData(machineApiUrl, data);
}


/* private */
function getData(url) {
	return ajax('GET', url);
}

function editData(url, data) {
	return ajax('PUT', url, data);
}

function createData(url, data) {
	return ajax('POST', url, data);
}

function deleteData(url) {
	return ajax('DELETE', url);
}

function ajax(method, url, data) {
	return $.ajax({
		method: method,
		url: url,
		data: data,
		// cache: false, //aviod ie bug if necessary
		// timeout: 30000, //ms
	});
}

