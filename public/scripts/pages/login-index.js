'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var Auth = require('../config/auth');
var redirect = require('../lib/helper/redirect');

/* DOM */
var $loginForm = $('form');
var $userName = $('#userName');
var $userPassword = $('#userPassword');
// var $csrfToken = $('#csrf_token');


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

		$.post(config.APIUrl + '/auth/login?name=' + $userName.val() + '&password=' + $userPassword.val())
		 .done(function(res){
			Auth.set(res);
			redirect('realtimeUrl');
			console.log("name=" + $userName.val() + "&password=" + $userPassword.val() + "&_token=" + res);
		 });
	}
};

function validateForm(){
	return true;
	//TODO: validate input
}