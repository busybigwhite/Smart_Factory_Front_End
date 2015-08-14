'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

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
    $csrfToken.val(res);
  });
}

function userLogin(e){

	console.log("name=" + $userName.val() + "&password=" + $userPassword.val() + "&_token=" + $csrfToken.val());

	e.preventDefault();
	var valid = validateForm();

	if (!valid) {
		//show validation msg
	} else {

		$.ajax({
			url: config.baseUrl + "/login",
			type: "POST",
			data: "name=" + $userName.val() + "&password=" + $userPassword.val() + "&_token=" + $csrfToken.val(),
			success: function(res){
			  document.cookie = res;
			  window.location.href = config.realtimeUrl;
			}
		});		
	}
};

function validateForm(){
	return true;
	//TODO: validate input
}