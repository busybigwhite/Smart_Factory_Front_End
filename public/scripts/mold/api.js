'use strict';

var $ = window.jQuery = require('jquery');
var qs = require('qs');
var assign = require('object-assign');
var config = require('../config/url');
var token = require('../config/auth').getToken();

var factoryId;
var moldApiUrl  = config.APIUrl + 'mold/';
var moldApiPicUrl = config.APIUrl + 'pic/mold/';
var moldPageUrl = config.moldUrl;
var isLocal = window.location.hostname === 'localhost';

exports = module.exports = {
	getMoldPicApiUrl: function() { return moldApiPicUrl },
	setFactoryId: setFactoryId,
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
};

function setFactoryId(id) {
	factoryId = id;
}

function goToMoldIndex() {
	window.location.href = moldPageUrl;
}

function goToMoldInfo(type, data) {
	var action = '';
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

function getMoldList() {
	var fakeData = [{"id":1,"serial_num":"Tamara","name":"Morar","factory_id":4,"weight":225,"type":"\u91d1\u5c6c","mold_pic":"af98a11227e26e53dca2b575dda24ec7","product_pic":"a6133659937b2a2079665e3602720067","length":989,"width":526,"height":675,"admin_id":1,"manufacturer":"\u4e09\u83f1","maintain_period_unit":"time","maintain_period_value":35,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":2,"serial_num":"Miller","name":"Sawayn","factory_id":2,"weight":959,"type":"\u91d1\u5c6c","mold_pic":"920ce96d875980ca2ab17b3d3fa6fe45","product_pic":"fef630efec3f97a1f5fd3b3c038f8826","length":237,"width":817,"height":502,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"times","maintain_period_value":90,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":3,"serial_num":"Sabrina","name":"Herman","factory_id":4,"weight":410,"type":"\u91d1\u5c6c","mold_pic":"26fd2ac4d638b1a004e6cd13619d74e6","product_pic":"e34ef7bef73d64265f90a0af70810d82","length":388,"width":281,"height":796,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"time","maintain_period_value":73,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":4,"serial_num":"Javonte","name":"O'Kon","factory_id":2,"weight":352,"type":"\u91d1\u5c6c","mold_pic":"7bcac3faca21420120914d14aad89383","product_pic":"5eebcab9cf8bc63353477069e9b85fe9","length":660,"width":445,"height":812,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"time","maintain_period_value":4,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":5,"serial_num":"Osbaldo","name":"Vandervort","factory_id":2,"weight":924,"type":"\u91d1\u5c6c","mold_pic":"92f88775ffc85b39beeff37c215d0e3f","product_pic":"a4d1982b16e5c75c3769e7ace5227a20","length":980,"width":1000,"height":970,"admin_id":1,"manufacturer":"\u8c50\u7530","maintain_period_unit":"times","maintain_period_value":12,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":6,"serial_num":"Torey","name":"Hickle","factory_id":1,"weight":819,"type":"\u91d1\u5c6c","mold_pic":"178afbec3fe0f2f151480d9251799439","product_pic":"38b5bd03e21dafc30c7e967611f54ebd","length":337,"width":18,"height":345,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"times","maintain_period_value":1,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":7,"serial_num":"Emmett","name":"Senger","factory_id":2,"weight":683,"type":"\u5851\u81a0","mold_pic":"bb4a7c50c3654def67946e1ded5841e6","product_pic":"76d8565ef51081f56811c77bcadf043a","length":962,"width":588,"height":500,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"times","maintain_period_value":46,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":8,"serial_num":"Ewell","name":"Hahn","factory_id":2,"weight":259,"type":"\u5851\u81a0","mold_pic":"fdc3215fd42546ed4d17864d58a51bad","product_pic":"af26e1c1da7fed4e0d476f9278e12f1f","length":864,"width":866,"height":530,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"times","maintain_period_value":66,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":9,"serial_num":"Ana","name":"Johns","factory_id":3,"weight":33,"type":"\u5851\u81a0","mold_pic":"a2ea4b232089c2148cb52919bbb543c2","product_pic":"b0b72e6c51ec00ade7915a702922041d","length":12,"width":255,"height":468,"admin_id":1,"manufacturer":"\u8c50\u7530","maintain_period_unit":"times","maintain_period_value":82,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"},{"id":10,"serial_num":"Sheridan","name":"Kshlerin","factory_id":2,"weight":955,"type":"\u91d1\u5c6c","mold_pic":"1c5bdd523e4a98587feba9b21ce10bcf","product_pic":"a850396a389681281c3a87c9e0b177a3","length":738,"width":266,"height":955,"admin_id":1,"manufacturer":"\u53f0\u4e2d\u7cbe\u6a5f","maintain_period_unit":"time","maintain_period_value":71,"lifetime":500000,"current_usage":100,"created_at":"2015-08-19 02:59:38","updated_at":"2015-08-19 02:59:38"}];
	return isLocal ? mockAjax(fakeData) : getData(moldApiUrl + 'list');
};

function getMoldInfo(id) {
	var fakeData = {"id":5,"serial_num":"Vincenzo","name":"Weimann","factory_id":4,"weight":237,"type":"\u91d1\u5c6c","mold_pic":"e12eaae655640c44070b323349693563","product_pic":"870f1eea03c76da52dc2ed1bf26b6cd4","length":354,"width":683,"height":43,"admin_id":1,"manufacturer":"\u8c50\u7530","maintain_period_unit":"times","maintain_period_value":98,"lifetime":500000,"current_usage":100,"created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20","maintain_records":[{"id":8,"mold_id":5,"type":"maintain","content":"test","created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20"},{"id":9,"mold_id":5,"type":"maintain","content":"test","created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20"},{"id":10,"mold_id":5,"type":"check","content":"test","created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20"},{"id":11,"mold_id":5,"type":"error","content":"test","created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20"},{"id":12,"mold_id":5,"type":"check","content":"test","created_at":"2015-08-20 06:10:20","updated_at":"2015-08-20 06:10:20"}]};
	return isLocal ? mockAjax(fakeData) : getData(moldApiUrl + id);
};

function getUserList() {
	var fakeData = [{"id":1,"name":"admin","group":"Administrator","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"},{"id":2,"name":"louk","group":"Manager","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"}];
	return isLocal ? mockAjax(fakeData) : getData(config.APIUrl + 'user/list');
}

function createMold(data) {
	return createData(moldApiUrl, data, true);
}

function deleteMold(id) {
	return deleteData(moldApiUrl + id);
}

function editMoldInfo(id, data) {
	return editData(moldApiUrl + id, data, true);
}

function createMoldRecord(id, data) {
	data.id = id;
	return createData(moldApiUrl + 'maintain/', data, false);
}

function deleteMoldRecord(id, data) {
	data.id = id;
	return deleteData(moldApiUrl + 'maintain/', data);
}


/* private */
function getData(url) {
	return ajax('GET', url);
}

function editData(url, data, isContainPics) {
	return ajax('PUT', url, data, isContainPics);
}

function createData(url, data, isContainPics) {
	return ajax('POST', url, data, isContainPics);
}

function deleteData(url, data) {
	return ajax('DELETE', url);
}

function ajax(method, url, data, isContainPics) {
	var data = assign({}, data); // prevent data is undefined
	data.factory_id = factoryId;
	data['_token'] = token;

	var opts = {
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
	};

	var picOpt = {
		contentType: false,
		processData: false,
	};

	// var ajaxOpts = isContainPics ? assign(opts, picOpt) : opts ;

	return $.ajax(opts);
}

function mockAjax(response) {
    var deferred = $.Deferred().resolve(response);
    return deferred.promise();
  }
