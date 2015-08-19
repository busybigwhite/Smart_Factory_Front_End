'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

var memberApiUrl  = config.APIUrl + 'user/';
var userApiUrl = config.APIUrl + 'me';

exports = module.exports = {
	getUser: getUser,
	getMemberList: getMemberList,
	createMember: createMember,
	deleteMember: deleteMember,
	getMember: getMember,
	editMember: editMember,
};

function getUser() {
	return getData(userApiUrl);
};

function getMemberList() {
	return getData(memberApiUrl);
};

function createMember(data) {
	return createData(memberApiUrl, data);
}

function deleteMember(id) {
	return deleteData(memberApiUrl + id);
}

function getMember(id) {
	return getData(memberApiUrl + id);
};

function editMember(id, data) {
	return editData(memberApiUrl + id);
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
	});
}