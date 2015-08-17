'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');
var api = require('../member/api');
var queryParameter = require('../lib/helper/query-parameter');

/* DOM */
var $userName = $('#userName');
var $userEmail = $('#userEmail');
var $userPassword = $('#userPassword');
var $userPasswordConfirm = $('#userPasswordConfirm');
var $userGroup1 = $('#userGroup1');
var $userGroup2 = $('#userGroup2');
var $addBtn = $('#member-add-btn');
var $editBtn = $('#member-edit-btn');
var $deleteBtn = $('#member-delete-btn');
var $backBtn = $('#member-back-btn');

var memberId = queryParameter.get('id');

initialize();

function initialize() {
	header.include();
	if (queryParameter.get('type') === 'add') {
		$editBtn.hide();
		$deleteBtn.hide();
	} else {
		$addBtn.hide();
		getInitialData();
	}
	bindEvents();
}

function bindEvents() {
	$addBtn.on('click', addMemberSubmit);
	$editBtn.on('click', editMemberSubmit);
	$deleteBtn.on('click', deleteMemberSubmit);
	$backBtn.on('click', goToMemberList);
}

function getInitialData() {
	api.getMember(memberId)
		 .done(function(res){
			 	$userName.val(res.name);
				$userEmail.val(res.email);

				if (res.group === 'Manager') {
					$userGroup1.prop("checked", true)
				} else {
					$userGroup2.prop("checked", true)
				}
		 })
		 .fail(function(err) { console.log("GET Member error: ", err); });
	// var response = {"id":"1","name":"admin","group":"Administrator","email":"admin@moremote.com"};
}

function getChangedData() {
	var data = {};

	data.name = $userName.val();
	data.password = $userPassword.val();
	data.email = $userEmail.val();
	data.group = $("[name='userGroup']:checked").val()

	return data;
}

function addMemberSubmit() {
	var data = getChangedData();

	api.createMember(data)
		 .done(function(data) { console.log("CREATE Member res: ", data); })
		 .fail(function(err) { console.log("CREATE Member error: ", err); });
	window.location.href = config.memberUrl;
}

function editMemberSubmit() {
	var data = getChangedData();

	api.editMember(memberId, data)
		 .done(function(data) { console.log("EDIT Member res: ", data); })
		 .fail(function(err) { console.log("EDIT Member error: ", err); });
	window.location.href = config.memberUrl;
}

function deleteMemberSubmit() {
	api.deleteMember(memberId)
		 .done(function(data) { console.log("DELETE Member res: ", data); })
		 .fail(function(err) { console.log("DELETE Member error: ", err); });
	window.location.href = config.memberUrl;
}

function goToMemberList(){
	window.location.href = config.memberUrl;
}