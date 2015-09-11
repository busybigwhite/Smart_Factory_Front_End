'use strict';

var $ = window.jQuery = require('jquery');
var qs = require('qs');
var assign = require('object-assign');
var config = require('../config/url');
var token = require('../config/auth').getToken();

var factoryId;
var machineApiUrl  = config.APIUrl + 'machine';
var machinePageUrl = config.machineUrl;
var isLocal = window.location.hostname === 'localhost';

exports = module.exports = {
	setFactoryId: setFactoryId,
	goToMachineIndex: goToMachineIndex,
	goToMachineInfo: goToMachineInfo,
	getMachineList: getMachineList,
	getMachineInfo: getMachineInfo,
	getAvailabilityRate: getAvailabilityRate,
	getUserList: getUserList,
	createMachine: createMachine,
	deleteMachine: deleteMachine,
	editMachineInfo: editMachineInfo,
	createMachineRecord: createMachineRecord,
	deleteMachineRecord: deleteMachineRecord,
	checkSerialNumUniq: checkSerialNumUniq
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

function getMachineList(data) {
	// var fakeData = [];
	var fakeData = [{"id":1,"name":"Will","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544}, {"id":1,"serial_num":"Viviane","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544}, {"id":1,"serial_num":"Viviane","name":"Will","factory_id":1,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544}, {"id":1,"serial_num":"Viviane","name":"Will","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52"}, {"id":1,"serial_num":"Viviane","name":"Will","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544},{"id":2,"serial_num":"Ottis","name":"Cummings","factory_id":1,"weight":372,"acquisition":"1990-10-02 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":68,"maintain_period_unit":"time","maintain_period_value":10,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544},{"id":3,"serial_num":"Willa","name":"Dietrich","factory_id":1,"weight":697,"acquisition":"1997-07-04 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":24,"maintain_period_unit":"time","maintain_period_value":36,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 93.2264},{"id":4,"serial_num":"Carmen","name":"Carter","factory_id":1,"weight":825,"acquisition":"1997-10-05 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":20,"maintain_period_unit":"times","maintain_period_value":59,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 96.125232},{"id":5,"serial_num":"Electa","name":"Lehner","factory_id":4,"weight":664,"acquisition":"2003-09-01 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":60,"maintain_period_unit":"time","maintain_period_value":72,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 91.122123},{"id":6,"serial_num":"Carmelo","name":"Rempel","factory_id":4,"weight":274,"acquisition":"2008-10-01 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":72,"maintain_period_unit":"time","maintain_period_value":60,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 97.84422},{"id":7,"serial_num":"Aidan","name":"Mohr","factory_id":2,"weight":10,"acquisition":"2007-08-07 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":98,"maintain_period_unit":"times","maintain_period_value":22,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 92.12234},{"id":8,"serial_num":"Vince","name":"O'Conner","factory_id":1,"weight":809,"acquisition":"2004-09-04 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":85,"maintain_period_unit":"time","maintain_period_value":50,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 96.112512},{"id":9,"serial_num":"Gillian","name":"Metz","factory_id":1,"weight":76,"acquisition":"1991-08-10 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":61,"maintain_period_unit":"time","maintain_period_value":33,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 99.85435},{"id":10,"serial_num":"Dianna","name":"Donnelly","factory_id":1,"weight":300,"acquisition":"1991-09-02 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":75,"maintain_period_unit":"times","maintain_period_value":53,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 89.53234},{"id":11,"serial_num":"123","name":"123","factory_id":1,"weight":123,"acquisition":"2015-08-21 06:46:41","admin_id":2,"check_period_unit":"times","check_period_value":123,"maintain_period_unit":"times","maintain_period_value":123,"created_at":"2015-08-21 06:46:41","updated_at":"2015-08-21 06:46:41", "availability_rate": 87.512334},{"id":12,"serial_num":"321","name":"321","factory_id":1,"weight":321,"acquisition":"2015-08-21 07:39:02","admin_id":2,"check_period_unit":"times","check_period_value":32,"maintain_period_unit":"times","maintain_period_value":321,"created_at":"2015-08-21 07:39:02","updated_at":"2015-08-21 07:39:02", "availability_rate": 88.5234},{"id":13,"serial_num":"123456","name":"test","factory_id":1,"weight":1,"acquisition":"2015-08-21 10:34:56","admin_id":2,"check_period_unit":"times","check_period_value":1,"maintain_period_unit":"times","maintain_period_value":10,"created_at":"2015-08-21 10:34:56","updated_at":"2015-08-21 10:34:56", "availability_rate": 98.85656}];
	// var fakeData = [{"id":1,"serial_num":"Viviane","name":"Will","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544},{"id":2,"serial_num":"Ottis","name":"Cummings","factory_id":1,"weight":372,"acquisition":"1990-10-02 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":68,"maintain_period_unit":"time","maintain_period_value":10,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 95.1585544},{"id":3,"serial_num":"Willa","name":"Dietrich","factory_id":1,"weight":697,"acquisition":"1997-07-04 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":24,"maintain_period_unit":"time","maintain_period_value":36,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 93.2264},{"id":4,"serial_num":"Carmen","name":"Carter","factory_id":1,"weight":825,"acquisition":"1997-10-05 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":20,"maintain_period_unit":"times","maintain_period_value":59,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 96.125232},{"id":5,"serial_num":"Electa","name":"Lehner","factory_id":4,"weight":664,"acquisition":"2003-09-01 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":60,"maintain_period_unit":"time","maintain_period_value":72,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 91.122123},{"id":6,"serial_num":"Carmelo","name":"Rempel","factory_id":4,"weight":274,"acquisition":"2008-10-01 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":72,"maintain_period_unit":"time","maintain_period_value":60,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 97.84422},{"id":7,"serial_num":"Aidan","name":"Mohr","factory_id":2,"weight":10,"acquisition":"2007-08-07 00:00:00","admin_id":1,"check_period_unit":"times","check_period_value":98,"maintain_period_unit":"times","maintain_period_value":22,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 92.12234},{"id":8,"serial_num":"Vince","name":"O'Conner","factory_id":1,"weight":809,"acquisition":"2004-09-04 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":85,"maintain_period_unit":"time","maintain_period_value":50,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 96.112512},{"id":9,"serial_num":"Gillian","name":"Metz","factory_id":1,"weight":76,"acquisition":"1991-08-10 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":61,"maintain_period_unit":"time","maintain_period_value":33,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 99.85435},{"id":10,"serial_num":"Dianna","name":"Donnelly","factory_id":1,"weight":300,"acquisition":"1991-09-02 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":75,"maintain_period_unit":"times","maintain_period_value":53,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52", "availability_rate": 89.53234},{"id":11,"serial_num":"123","name":"123","factory_id":1,"weight":123,"acquisition":"2015-08-21 06:46:41","admin_id":2,"check_period_unit":"times","check_period_value":123,"maintain_period_unit":"times","maintain_period_value":123,"created_at":"2015-08-21 06:46:41","updated_at":"2015-08-21 06:46:41", "availability_rate": 87.512334},{"id":12,"serial_num":"321","name":"321","factory_id":1,"weight":321,"acquisition":"2015-08-21 07:39:02","admin_id":2,"check_period_unit":"times","check_period_value":32,"maintain_period_unit":"times","maintain_period_value":321,"created_at":"2015-08-21 07:39:02","updated_at":"2015-08-21 07:39:02", "availability_rate": 88.5234},{"id":13,"serial_num":"123456","name":"test","factory_id":1,"weight":1,"acquisition":"2015-08-21 10:34:56","admin_id":2,"check_period_unit":"times","check_period_value":1,"maintain_period_unit":"times","maintain_period_value":10,"created_at":"2015-08-21 10:34:56","updated_at":"2015-08-21 10:34:56", "availability_rate": 98.85656}];
	return isLocal ? mockAjax(fakeData) : getData(machineApiUrl + '/list', data);
};

function getMachineInfo(id) {
	var fakeData = [{"id":1,"serial_num":"Viviane","name":"Will","factory_id":1,"weight":149,"acquisition":"1991-01-06 00:00:00","admin_id":1,"check_period_unit":"time","check_period_value":40,"maintain_period_unit":"time","maintain_period_value":99,"created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52","maintain_record_error":[],"maintain_record_check":[{"id":1,"machine_id":1,"type":"check","content":"test","created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52"}],"maintain_record_maintain":[{"id":2,"machine_id":1,"type":"maintain","content":"test","created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52"}],"maintain_records":[{"id":1,"machine_id":1,"type":"check","content":"test","created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52"},{"id":2,"machine_id":1,"type":"maintain","content":"test","created_at":"2015-08-21 04:58:52","updated_at":"2015-08-21 04:58:52"}]}];
	// var fakeData = {"id": 2,"serial_num": "kimi2ipc-001","name": "001","factory_id": 1,"weight": 111,"acquisition": "2015-08-31 11:15:54","admin_id": 4,"check_period_unit": "time","check_period_value": 11,"maintain_period_unit": "time","maintain_period_value": 11,"created_at": "2015-08-31 11:15:54","updated_at": "2015-08-31 11:15:54","maintain_record_error": [{"id": 1,"machine_id": 2,"type": "error","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}, {"id": 4,"machine_id": 2,"type": "error","content": "haha","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}],"maintain_record_check": [{"id": 2,"machine_id": 2,"type": "check","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"},{"id": 5,"machine_id": 2,"type": "check","content": "gerger","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}],"maintain_record_maintain": [{"id": 3,"machine_id": 2,"type": "maintain","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}, {"id": 6,"machine_id": 2,"type": "maintain","content": "???!!!!","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}],"maintain_records": [{"id": 1,"machine_id": 2,"type": "error","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"},{"id": 2,"machine_id": 2,"type": "check","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"},{"id": 3,"machine_id": 2,"type": "maintain","content": "kerker","created_at": "2015-08-31 11:16:45","updated_at": "2015-08-31 11:16:45"}]};
	return isLocal ? mockAjax(fakeData) : getData(machineApiUrl + '/' + id);
};

function getUserList() {
	var fakeData = [{"id":1,"name":"admin","group":"Administrator","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"},{"id":2,"name":"louk","group":"Manager","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"}];
	return isLocal ? mockAjax(fakeData) : getData(config.APIUrl + 'user/list');
}

function getAvailabilityRate(id) {
	var fakeData = 100;
	return isLocal ? mockAjax(fakeData) : getData(machineApiUrl + '/availability_rate/' + id);
}

function createMachine(data) {
	return createData(machineApiUrl, data);
}

function deleteMachine(id) {
	return deleteData(machineApiUrl + '/' + id);
}

function editMachineInfo(id, data) {
	return editData(machineApiUrl + '/'  + id, data);
}

function createMachineRecord(id, array) {
	var pArray = array.map(function(obj) {
		return createData(machineApiUrl + '/' + id + '/maintain', obj);
	});

	return $.when(pArray);
}

function deleteMachineRecord(id, array) {

	var pArray = array.map(function(obj) {
		return deleteData(machineApiUrl + '/' + id + '/maintain/' + obj.id, obj);
	});

	return $.when(pArray);
}

function checkSerialNumUniq(serialNum, id) {
	var data = { 'serial_num': serialNum, 'machine_id': id };

	return checkUniq(machineApiUrl + '/check_unique', data);
}

/* private */
function getData(url, data) {
	return ajax('GET', url, data);
}

function editData(url, data) {
	return ajax('PUT', url, data);
}

function createData(url, data) {
	return ajax('POST', url, data);
}

function deleteData(url, data) {
	return ajax('DELETE', url, data);
}

function checkUniq(url, data) {
	return ajax('GET', url, data);
}

function ajax(method, url, data) {
	var data = assign({}, data); // prevent data is undefined
	data.factory_id = factoryId;
	data['_token'] = token;

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
