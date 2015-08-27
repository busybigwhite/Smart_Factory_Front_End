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
		$.post(config.APIUrl + 'auth/login?name=' + $userName.val() + '&password=' + $userPassword.val() + '&_token=' + $csrfToken.val())
		 .done(function(){

		 	$.when( setAuthority() )
		 	 .then(function(authority) {
		 	 	Auth.set($userName.val(), $csrfToken.val(), authority);
		 	 	redirect('realtime');
		 	 })

		 })
		 .fail(function(res){
		 	res.status === 404 && alert('請確認帳號/密碼輸入是否正確');
		 });
	}
};

function setAuthority() {
	var defer = $.Deferred();

	$.get(config.APIUrl + 'me')
	 .done(function(res){
	 	defer.resolve(res.group);
	 })

	return defer.promise();
}

function validateForm(){
	return true;
	//TODO: validate input
}