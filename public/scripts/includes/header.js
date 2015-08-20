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
	resetHrefLink();
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
	$.get(config.APIUrl + 'auth/logout')
	 .done(function(res){
	 		Auth.set('', '');
			redirect('login');
	 })
	 .fail(function(err) { console.log("LOGOUT error: ", err); });
}

function resetHrefLink() {
	$('.navbar-item').each(function(){
		this.href.replace('..', config.baseUrl);
	});
}

function getPathAndFocusOnNavItem() {
	var page = window.location.pathname.split('/')[1];

	$('.navbar-item').attr('class', 'navbar-item ' + page);
}

function getUserName() {
	var name = Auth.getName();

	$('#user-name').text(name);
}
