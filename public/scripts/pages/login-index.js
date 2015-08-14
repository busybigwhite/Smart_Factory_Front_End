'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

/* DOM */
var $loginForm = $('form');
var $userEmail = $('#userEmail');
var $userPassword = $('#userPassword');

initialize();

function initialize() {
	bindEvents();
}

function bindEvents() {
	$loginForm.on('submit', userLogin);
}

function userLogin(e){

	e.preventDefault();
	var valid = validateForm();

	if (!valid) {
		//show validation msg
	} else {

		$.ajax({
			url: config.baseUrl + "/login",
			type: "POST",
			data: "email=" + $userEmail.val() + "&password=" + $userPassword.val(),
			success: function(res){
			  //set token
			}
		});
	}
};

function validateForm(){
	return true;
	//TODO: validate input
}