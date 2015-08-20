'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var template = require('../member/template');
var api = require('../member/api');
var factoryDropdown = require('../lib/component/dropdown');
var redirect = require('../lib/helper/redirect');

/* DOM */
var $memberNewBtn = $('#member-new-button');
var $memberTable = $('#member-table');
var $memberTableBody = $('#member-table-body');

initialize();

function initialize() {
	header.include();
	getInitialData();
	bindEvents();
}

function getInitialData() {

	api.getMemberList()
		 .done(initialView)
		 .fail(function(err) { console.log("GET Member List error: ", err); });
	// var response = [
	// 	{"id":"1","name":"admin","group":"Administrator","email":"admin@moremote.com"},
	// 	{"id":"2","name":"louk","group":"Manager","email":"louk@moremote.com"},
	// 	{"id":"3","name":"unknown","group":"Customer","email":"unknown@moremote.com"}
	// ];

	// initialView(response);
}

function bindEvents() {
	$memberNewBtn.on('click', gotoMemberNewPage);
	$memberTable.on('click', '.member-edit-button', gotoMemberEditPage);
}

function initialView(data) {
	var tableListRows = template.render({ infos : data });
	$memberTableBody.empty().append( tableListRows );
}

function gotoMemberNewPage() {
	redirect('memberManage', { type: 'add' });
}

function gotoMemberEditPage() {
	var id = $(this).data('id');

	redirect('memberManage', { type: 'edit', id: id });
}