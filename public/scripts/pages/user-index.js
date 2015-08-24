'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var auth = require('../config/auth');
var header = require('../includes/header');
var api = require('../member/api');
var factoryDropdown = require('../lib/component/dropdown');

/* DOM */
var $userForm = $('#user-setting');
var $userName = $('#userName');
var $userEmail = $('#userEmail');
var $userPassword = $('#userPassword');
var $userPasswordConfirm = $('#userPasswordConfirm');
var $userGroup = $('#userGroup');
var $editBtn = $('#user-edit-btn');

var pwd1Input = document.getElementById("userPassword");
var pwd2Input = document.getElementById("userPasswordConfirm");
var memberId = '';

initialize();

function initialize() {
	api.getUser()
		.done(function(res){
			memberId = res.id;
			getInitialData();
		})
		.fail(function(err) { console.log("GET Member Id error: ", err); });

	console.log(memberId);

	header.include();
	bindEvents();
}

function bindEvents() {
	$editBtn.on('click', editUserSubmit);

	if(supports_input_validity()) {

	  pwd1Input.setCustomValidity(pwd1Input.title);
	  pwd1Input.addEventListener('keyup', checkPwd1, false);
	  pwd2Input.addEventListener('keyup', checkPwd2, false);

	}
}

function supports_input_validity(){
	var i = document.createElement("input");
  return "setCustomValidity" in i;
}

function checkPwd1(){
	this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
}

function checkPwd2(){
	this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
}

function formValidate(){
	if (!$userForm[0].checkValidity()) {
		$('<input type="submit">').hide().appendTo($userForm).click().remove();
  	return false;
	} else {
		return true;
	}
}

function getInitialData() {
	api.getMember(memberId)
		 .done(function(res){
			 	$userName.text(res.name);
				$userEmail.val(res.email);
				$userGroup.text(res.group);
		 })
		 .fail(function(err) { console.log("GET Member error: ", err); });

		// $userName.text('admin');
		// $userEmail.val('admin@moremote.com');
		// $userGroup.text('Administrator');
}

function getChangedData() {
	var data = {};

	data.name = $userName.text();
	data.group = $userGroup.text();

	data.password = $userPassword.val();
	data.password_confirmation = $userPasswordConfirm.val();
	data.email = $userEmail.val();
	data._token = auth.getToken();

	return data;
}

function editUserSubmit() {
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