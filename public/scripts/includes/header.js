'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var Auth = require('../config/auth');
var redirect = require('../lib/helper/redirect');

/* DOM */
var $logoutBtn;

exports = module.exports = {};

exports.include = function(){
	$("#header").load(config.headerUrl, function(res, status){
        status === "success" && initialize();
    });
}

function initialize() {
	$logoutBtn = $('#logout-btn');

	bindEvents();
	Auth.set('Moremote', '1234567890');
	getPathAndFocusOnNavItem();
    getUserName();
}

function bindEvents() {
	bindLogoutOnButton();
}

function bindLogoutOnButton() {
	$logoutBtn.on('click', logout);
}

function logout() {
	//TODO call logout API
	Auth.set('', '');
	redirect('login');
}

function getPathAndFocusOnNavItem() {
	var page = window.location.pathname.split('/')[1];

	$('.navbar-item').attr('class', 'navbar-item ' + page);
}

function getUserName() {
	var name = Auth.getName();

	$('#user-name').text(name);
}
