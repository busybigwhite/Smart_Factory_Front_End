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
	transferKeyC2S: transferKeyC2S,
	transferKeyS2C: transferKeyS2C
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
	return editData(wordorderApiUrl + 'edit/' + id, data);
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

function transferKeyS2C(key){
	switch(key){
		case "id":
			return "workorder-num";
		case "order_id":
			return "order-num";
		case "customer_id":
			return "customer-name";
		case "factory":
			return "factory";
		case "status":
			return "workorder-status";
		case "order_date":
			return "input-date";
		case "description":
			return "description";
		case "schedule_date":
			return "forecast-time";
		case "target_num":
			return "forecast-amount";
		case "produce_type":
			return "type";
		case "start_date":
			return "real-produce-date";
		case "current_num":
			return "real-amount";
		case "finish_date":
			return "real-finish";
	}
}

function transferKeyC2S(key){
	switch(key){
		case "workorder-num":
			return "id";
		case "order-num":
			return "order_id";
		case "customer-name":
			return "customer_id";
		case "factory":
			return "factory";
		case "workorder-status":
			return "status";
		case "input-date":
			return "order_date";
		case "description":
			return "description";
		case "forecast-time":
			return "schedule_date";
		case "forecast-amount":
			return "target_num";
		case "type":
			return "produce_type";
		case "real-produce-date":
			return "start_date";
		case "real-amount":
			return "current_num";
		case "real-finish":
			return "finish_date";
	}
}

