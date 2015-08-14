'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

exports = module.exports = {
	goToMachineIndex: goToMachineIndex,
	goToMachineInfo: goToMachineInfo,
	createMachine: createMachine,
	deleteMachine: deleteMachine,
	getMachineInfo: getMachineInfo,
	editMachineInfo: editMachineInfo,
};

function goToMachineIndex() {
	window.location.href = config.machineUrl;
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
	window.location.href = config.machineUrl + 'info' + action;
}

function createMachine(id) {
	return createData(config.machineUrl + 'api/machine/' + id);
}

function deleteMachine(id) {
	return deleteData(config.machineUrl + 'api/machine/' + id);
}

function getMachineInfo(id) {
	return getData(config.machineUrl + 'api/machine/info/' + id);
};

function editMachineInfo(id, data) {
	return editData(config.machineUrl + 'api/machine/info/' + id);
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

