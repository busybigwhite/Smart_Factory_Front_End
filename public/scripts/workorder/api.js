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
	console.log("createData use post url = "+wordorderApiUrl);
	return createData(wordorderApiUrl, data);
}

function deleteWorkOrder(id, token) {
	console.log("delete with token as data url = "+wordorderApiUrl + id);
	return deleteData(wordorderApiUrl + id, token);
}

function getWorkOrderInfo(id) {
	console.log("get url = "+wordorderApiUrl + id);
	return getData(wordorderApiUrl + id);
};

function editWorkOrderInfo(id, data) {
	console.log("edit url = "+wordorderApiUrl + id);
	return editData(wordorderApiUrl + id, data);//include token
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

function deleteData(url, token) {
	return ajax('DELETE', url, token);
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
		case "content":
			return "description";
		case "schedule_date":
			return "schedule-date";
		case "target_num":
			return "order-amount";
		case "current_fail_num":
			return "defective-amount"
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
			return "content";
		case "schedule-date":
			return "schedule_date";
		case "order-amount":
			return "target_num";
		case "defective-amount":
			return "current_fail_num"
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

