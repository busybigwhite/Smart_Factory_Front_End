'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');
var template = require('../member/template');

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
	var response = [
		{"id":"1","name":"admin","group":"Administrator","email":"admin@moremote.com"},
		{"id":"2","name":"louk","group":"Manager","email":"louk@moremote.com"}
	];

	initialView(response);
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
	window.location.href = config.memberUrl + 'new/';
}

function gotoMemberEditPage() {
	var id = $(this).data('id');
	window.location.href = config.memberUrl + 'edit?id=' + id;
}