'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var Auth = require('../config/auth');
var redirect = require('../lib/helper/redirect');

/* DOM */
var $logoutBtn;

var authority;

exports = module.exports = {};

exports.include = function(){
	$("#header").load(config.headerUrl, function(res, status){
        status === "success" && initialize();
    });
}

function initialize() {
	$logoutBtn = $('#logout-btn');

	bindEvents();
	displayByAuthority();
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
	 		Auth.set('', '', '');
			redirect('login');
	 })
	 .fail(function(err) { console.log("LOGOUT error: ", err); });
}

function displayByAuthority() {
	authority = Auth.getAuthority();

	$('.navbar-item').addClass(authority);
}

function resetHrefLink() {
	$('.navbar-item').each(function(){
		var path = $(this).children('a').attr('href').split('/')[1];
		$(this).children('a').attr('href', config.baseUrl + '/' + path);
	});
}

function getPathAndFocusOnNavItem() {
	var page = window.location.pathname.split('/')[1];

	$('.navbar-item').attr('class', 'navbar-item ' + authority + ' ' + page);
}

function getUserName() {
	var name = Auth.getName();

	$('#user-name').text(name);
}
