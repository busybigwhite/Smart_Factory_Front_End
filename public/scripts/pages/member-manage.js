'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');
var api = require('../member/api');
var queryParameter = require('../lib/helper/query-parameter');

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

	var supports_input_validity = function()
	{
	  var i = document.createElement("input");
	  return "setCustomValidity" in i;
	}

	if(supports_input_validity()) {
	  
	  usernameInput.setCustomValidity(usernameInput.title);
	  pwd1Input.setCustomValidity(pwd1Input.title);

	  usernameInput.addEventListener("keyup", function() {
	    usernameInput.setCustomValidity(this.validity.patternMismatch ? usernameInput.title : "");
	  }, false);

	  pwd1Input.addEventListener("keyup", function() {
	    this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
	    if(this.checkValidity()) {
	      pwd2Input.pattern = this.value;
	      pwd2Input.setCustomValidity(pwd2Input.title);
	    } else {
	      pwd2Input.pattern = this.pattern;
	      pwd2Input.setCustomValidity("");
	    }
	  }, false);

	  pwd2Input.addEventListener("keyup", function() {
	    this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
	  }, false);

	}
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

	if (formValidate()) {
		api.createMember(data)
		 .done(function(data) { console.log("CREATE Member res: ", data); })
		 .fail(function(err) { console.log("CREATE Member error: ", err); });
		window.location.href = config.memberUrl;
	};
}

function editMemberSubmit() {
	var data = getChangedData();

	if (formValidate()) {
		api.editMember(memberId, data)
		 .done(function(data) { console.log("EDIT Member res: ", data); })
		 .fail(function(err) { console.log("EDIT Member error: ", err); });
		window.location.href = config.memberUrl;
	};
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

function formValidate(){
	if (!$manageForm[0].checkValidity()) {
		$('<input type="submit">').hide().appendTo($manageForm).click().remove();
  	return false;
	} else {
		return true;
	}
}

function checkPassword(str) {
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
	return re.test(str);
}