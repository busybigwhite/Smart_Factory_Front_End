'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var Auth = require('../config/auth');
var redirect = require('../lib/helper/redirect');

/* DOM */
var $loginForm = $('form');
var $userName = $('#userName');
var $userPassword = $('#userPassword');
var $csrfToken = $('#csrf_token');


initialize();

function initialize() {
	getToken();
	bindEvents();
}

function bindEvents() {
	$loginForm.on('submit', userLogin);
}

function getToken(){
	$.get( config.baseUrl + "/api/token" )
  	 .done(function(res) {
    	$csrfToken.val(res.csrf_token);
  	 });
}

function userLogin(e){

	e.preventDefault();
	var valid = validateForm();

	if (!valid) {
		//show validation msg
	} else {
		$.post(config.APIUrl + '/auth/login?name=' + $userName.val() + '&password=' + $userPassword.val() + '&_token=' + $csrfToken.val())
		 .done(function(res){
		 	console.log("name=" + $userName.val() + "&password=" + $userPassword.val() + "&_token=" + $csrfToken.val());
			Auth.set(res.csrf_token);
			redirect('realtimeUrl');
		 });
	}
};

function validateForm(){
	return true;
	//TODO: validate input
}