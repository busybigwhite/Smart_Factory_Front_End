'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var auth = require('../config/auth');
var header = require('../includes/header');
var api = require('../member/api');
var queryParameter = require('../lib/helper/query-parameter');
var factoryDropdown = require('../lib/component/dropdown');

/* DOM */
var $manageForm = $('#manage-form');
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

var usernameInput = document.getElementById("userName");
var pwd1Input = document.getElementById("userPassword");
var pwd2Input = document.getElementById("userPasswordConfirm");

var memberId = queryParameter.get('id');
var origName = '';
var memberList = [];
var isEditMode = false;

initialize();

function initialize() {
	header.include();

	if (queryParameter.get('type') === 'add') {
		$editBtn.hide();
		$deleteBtn.hide();
	} else {
		isEditMode = true;
		$addBtn.hide();
		getInitialData();
		checkUsername();
	}
	bindEvents();
	getMemberArray();
}

function bindEvents() {
	$addBtn.on('click', addMemberSubmit);
	$editBtn.on('click', editMemberSubmit);
	$deleteBtn.on('click', deleteMemberSubmit);
	$backBtn.on('click', goToMemberList);

	if(supports_input_validity()) {

	  usernameInput.setCustomValidity(usernameInput.title);
	  pwd1Input.setCustomValidity(pwd1Input.title);

	  usernameInput.addEventListener('keyup', checkUsername, false);
	  pwd1Input.addEventListener('keyup', checkPwd1, false);
	  pwd2Input.addEventListener('keyup', checkPwd2, false);

	}
}

function supports_input_validity(){
	var i = document.createElement("input");
  return "setCustomValidity" in i;
}

function checkUsername(){
	if($.inArray(this.value, memberList) > -1){
		if ((isEditMode == true) && (this.value == origName)) {
			this.pattern = "^[a-z0-9]{4,16}$";
			this.title = "帳號需至少4碼，限用小寫與數字";
		} else {
			this.pattern = "";
			this.title = "帳號名稱已被使用";
		}
	} else {
		this.pattern = "^[a-z0-9]{4,16}$";
		this.title = "帳號需至少4碼，限用小寫與數字";
	}
  usernameInput.setCustomValidity(this.validity.patternMismatch ? usernameInput.title : "");
}

function checkPwd1(){
	this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
}

function checkPwd2(){
	this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
}

function formValidate(){
	if (!$manageForm[0].checkValidity()) {
		$('<input type="submit">').hide().appendTo($manageForm).click().remove();
  	return false;
	} else {
		return true;
	}
}

function getMemberArray(){
	// var response = [
	// 	{"id":"1","name":"admin","group":"Administrator","email":"admin@moremote.com"},
	// 	{"id":"2","name":"louk","group":"Manager","email":"louk@moremote.com"},
	// 	{"id":"3","name":"unknown","group":"Customer","email":"unknown@moremote.com"}
	// ];

	api.getMemberList()
	 .done(function(res){
	 		res.forEach(function (element){
				memberList.push(element.name);
			});
	 })
	 .fail(function(err) { console.log("GET Member Array error: ", err); });

 // 	response.forEach(function (element){
	// 	memberList.push(element.name);
	// });
}

function getInitialData() {
	api.getMember(memberId)
		 .done(function(res){
		 		if (isEditMode == true) {
		 			origName = res.name;
		 		}
			 	$userName.val(res.name);
				$userEmail.val(res.email);

				if (res.group === 'Manager') {
					$userGroup1.prop("checked", true);
				} else {
					$userGroup2.prop("checked", true);
				}
		 })
		 .fail(function(err) { console.log("GET Member error: ", err); });

	// $userName.val('louk');
	// $userEmail.val('louk@moremote.com');
	// $userGroup1.prop("checked", true);
}

function getChangedData() {
	var data = {};

	data.name = $userName.val();
	data.password = $userPassword.val();
	data.password_confirmation = $userPasswordConfirm.val();
	data.email = $userEmail.val();
	data.group = $("[name='userGroup']:checked").val()
	data._token = auth.getToken();

	return data;
}

function addMemberSubmit() {
	var data = getChangedData();

	if (formValidate()) {
		api.createMember(data)
		 .done(function(data) { console.log("CREATE Member res: ", data); })
		 .fail(function(err) { console.log("CREATE Member error: ", err); })
		 .always(function(){
		 	window.location.href = config.memberUrl;
		 });
	};
}

function editMemberSubmit() {
	var data = getChangedData();

	if (formValidate()) {
		api.editMember(memberId, data)
		 .done(function(data) { console.log("EDIT Member res: ", data); })
		 .fail(function(err) { console.log("EDIT Member error: ", err); })
		 .always(function(){
		 	window.location.href = config.memberUrl;
		 });
	};
}

function deleteMemberSubmit() {
	var token = auth.getToken();

	api.deleteMember(memberId, { _token: token })
		 .done(function(data) { console.log("DELETE Member res: ", data); })
		 .fail(function(err) { console.log("DELETE Member error: ", err); })
		 .always(function(){
		 	window.location.href = config.memberUrl;
		 });
}

function goToMemberList(){
	window.location.href = config.memberUrl;
}