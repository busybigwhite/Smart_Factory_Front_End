'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

var wordorderApiUrl  = config.APIUrl + 'workorder/';
var wordorderPageUrl = config.workorderUrl;

exports = module.exports = {
	goToWorkOrderIndex: goToWorkOrderIndex,
	goToMachineInfo: goToMachineInfo,
	getWorkOrderList: getWorkOrderList,
	createWorkOrder: createWorkOrder,
	deleteWorkOrder: deleteWorkOrder,
	getWorkOrderInfo: getWorkOrderInfo,
	editWorkOrderInfo: editWorkOrderInfo,
};

function goToWorkOrderIndex() {
	console.log("goToWorkOrderIndex");
	window.location.href = wordorderPageUrl;
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
	window.location.href = wordorderPageUrl + 'info' + action;
}

function getWorkOrderList(id) {
	return getData(wordorderApiUrl + 'list', id);
};

function createWorkOrder(data) {
	return createData(wordorderApiUrl+'new/', data);
}

function deleteWorkOrder(id) {
	return deleteData(wordorderApiUrl + id);
}

function getWorkOrderInfo(id) {
	return getData(wordorderApiUrl + 'info/' + id);
};

function editWorkOrderInfo(id, data) {
	return editData(wordorderApiUrl + 'edit/' + id);
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

