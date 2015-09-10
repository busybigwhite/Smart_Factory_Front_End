'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var qs = require('qs');
var assign = require('object-assign');
var config = require('../config/url');

var factoryId;
var scrappedType;
var token;
var moldApiUrl  = config.APIUrl + 'mold';
var moldApiPicUrl = config.APIUrl + 'pic/mold/';
var moldPageUrl = config.moldUrl;
var isLocal = window.location.hostname === 'localhost';

exports = module.exports = {
	getMoldPicApiUrl: function() { return moldApiPicUrl },
	setFactoryId: setFactoryId,
	setScrappedType: setScrappedType,
	goToMoldIndex: goToMoldIndex,
	goToMoldInfo: goToMoldInfo,
	getMoldList: getMoldList,
	getMoldInfo: getMoldInfo,
	getUserList: getUserList,
	createMold: createMold,
	deleteMold: deleteMold,
	editMoldInfo: editMoldInfo,
	createMoldRecord: createMoldRecord,
	deleteMoldRecord: deleteMoldRecord,
	checkSerialNumUniq: checkSerialNumUniq,
	setToken: setToken
};

function setFactoryId(id) {
	factoryId = id;
}

function setScrappedType(type) {
	scrappedType = type;
}

function goToMoldIndex() {
	window.location.href = moldPageUrl;
}

function goToMoldInfo(type, data) {
	var action = '';
	var data = assign({}, data); // prevent data is undefined
	data['factory_id'] = factoryId;

	switch(type) {
		case 'new':
			action = '?new=true&' + qs.stringify(data);
		break;

		case 'detail':
		default:
			action = '?' + qs.stringify(data);
	}
	window.location.href = moldPageUrl + 'info' + action;
}

function getMoldList(searchObj) {
	return getData(moldApiUrl + '/list?' + qs.stringify(searchObj));
};

function getMoldInfo(id) {
	return getData(moldApiUrl + '/' + id);
};

function getUserList() {
	var fakeData = [{"id":1,"name":"admin","group":"Administrator","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"},{"id":2,"name":"louk","group":"Manager","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"}];
	return isLocal ? mockAjax(fakeData) : getData(config.APIUrl + 'user/list');
}

function createMold(data) {
	return createData(moldApiUrl, data);
}

function deleteMold(id) {
	return deleteData(moldApiUrl + '/' + id);
}

function editMoldInfo(id, data) {
	return editData(moldApiUrl + '/' + id, data);
}

function createMoldRecord(id, array) {
	var pArray = array.map(function(obj) {
		return createData(moldApiUrl + '/' + id + '/maintain', obj);
	});

	return $.when(pArray);
}

function deleteMoldRecord(id, array) {
	var pArray = array.map(function(obj) {
		return deleteData(moldApiUrl + '/' + id + '/maintain/' + obj.id, obj);
	});

	return $.when(pArray);
}

function checkSerialNumUniq(serialNum, id) {
	var data = { 'serial_num': serialNum, 'mold_id': id };

	return checkUniq(moldApiUrl + '/check_unique', data);
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
	return ajax('DELETE', url, data);
}

function checkUniq(url, data) {
	return ajax('GET', url, data);
}

function ajax(method, url, data) {
	var data = assign({}, data); // prevent data is undefined
	data['factory_id'] = factoryId;

	if(method === 'GET') data['scrapped'] = scrappedType;

	var isContainPics = (!!data['mold_pic']) || (!!data['product_pic']);

	var processedData = new FormData();

	_.forEach(data, function(value, key) {
	  processedData.append(key, value);
	});

	var opts = {
		method: method,
		url: url,
		headers: { 'X-CSRF-Token': token },
		data: data
		// cache: false, //aviod ie bug if necessary
		// timeout: 30000, //ms
	};

	var picOpt = {
		contentType: false,
		processData: false,
		dataType: 'json',
		data: processedData,
	};

	var beforeSendOpt = {
		beforeSend: function() {
			console.log('AJAX INFO ----------------');
			console.log('method: ', method);
			console.log('url: ', url);
			console.log('contentType: ', picOpt.contentType);
			console.log('processData: ', picOpt.processData);
			console.log('data: ', isContainPics ? processedData : data);
			console.log('--------------------------');
		}
	};

	var ajaxOpts = isContainPics ? assign(opts, picOpt, beforeSendOpt) : assign(opts, beforeSendOpt) ;

  	 return $.ajax(ajaxOpts);
}

function setToken(newToken) {
	token = newToken;
}

function mockAjax(response) {
  var deferred = $.Deferred().resolve(response);
  return deferred.promise();
}