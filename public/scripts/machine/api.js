'use strict';

var $ = window.jQuery = require('jquery');
var qs = require('qs');
var assign = require('object-assign');
var config = require('../config/url');

var factoryId;
var machineApiUrl  = config.APIUrl + 'machine/';
var machinePageUrl = config.machineUrl;
var isLocal = window.location.hostname === 'localhost';

exports = module.exports = {
	setFactoryId: setFactoryId,
	goToMachineIndex: goToMachineIndex,
	goToMachineInfo: goToMachineInfo,
	getMachineList: getMachineList,
	getMachineInfo: getMachineInfo,
	getUserList: getUserList,
	createMachine: createMachine,
	deleteMachine: deleteMachine,
	editMachineInfo: editMachineInfo,
	createMachineRecord: createMachineRecord,
	deleteMachineRecord: deleteMachineRecord,
};

function setFactoryId(id) {
	factoryId = id;
}

function goToMachineIndex() {
	window.location.href = machinePageUrl;
}

function goToMachineInfo(type, data) {
	var action = '';
	switch(type) {
		case 'new':
			action = '?new=true&' + qs.stringify(data);
		break;

		case 'detail':
		default:
			action = '?' + qs.stringify(data);
	}
	window.location.href = machinePageUrl + 'info' + action;
}

function getMachineList() {
	var fakeData = [{"id":1,"name":"fakeData Hoeger","weight":768,"acquisition":"2008-09-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":2,"name":"O'Connell","weight":753,"acquisition":"1994-07-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":3,"name":"Steuber","weight":473,"acquisition":"1997-10-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":4,"name":"Hettinger","weight":349,"acquisition":"1996-08-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":5,"name":"Swift","weight":591,"acquisition":"1996-10-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":6,"name":"Waelchi","weight":694,"acquisition":"2012-10-02 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":7,"name":"Braun","weight":862,"acquisition":"1994-08-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":8,"name":"Bernier","weight":953,"acquisition":"1996-10-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":9,"name":"Zboncak","weight":646,"acquisition":"2002-11-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":10,"name":"Hartmann","weight":681,"acquisition":"2000-07-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"}];
	return isLocal ? mockAjax(fakeData) : getData(machineApiUrl + 'list');
};

function getMachineInfo(id) {
	var fakeData = {"id":2,"serial_num":"fakeData Helga","name":"Schmidt","weight":187,"acquisition":"1991-06-10 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":62,"maintain_period_unit":"times","maintain_period_value":85,"created_at":"2015-08-18 06:57:31","updated_at":"2015-08-18 06:57:31","maintain_records":[{"id":1,"machine_id":2,"type":"maintain","content":"test","created_at":"2015-08-18 06:57:31","updated_at":"2015-08-18 06:57:31"}]};
	return isLocal ? mockAjax(fakeData) : getData(machineApiUrl + id);
};

function getUserList() {
	var fakeData = [{"id":1,"name":"admin","group":"Administrator","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"},{"id":2,"name":"louk","group":"Manager","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"}];
	return isLocal ? mockAjax(fakeData) : getData(config.APIUrl + 'user/list');
}

function createMachine(data) {
	return createData(machineApiUrl, data);
}

function deleteMachine(id) {
	return deleteData(machineApiUrl + id);
}

function editMachineInfo(id, data) {
	return editData(machineApiUrl + id, data);
}

function createMachineRecord(id, data) {
	data.id = id;
	return createData(machineApiUrl + 'maintain/', data);
}

function deleteMachineRecord(id, data) {
	data.id = id;
	return deleteData(machineApiUrl + 'maintain/', data);
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

function deleteData(url, data) {
	return ajax('DELETE', url);
}

function ajax(method, url, data) {
	var data = assign({}, data); // prevent data is undefined
	data.factory_id = factoryId;

	return $.ajax({
		method: method,
		url: url,
		data: data,
		beforeSend: function() {
			console.log('AJAX INFO ----------------');
			console.log('method: ', method);
			console.log('url: ', url);
			console.log('data: ', data);
			console.log('--------------------------');
		},
		// cache: false, //aviod ie bug if necessary
		// timeout: 30000, //ms
	});
}

function mockAjax(response) {
    var deferred = $.Deferred().resolve(response);
    return deferred.promise();
  }
