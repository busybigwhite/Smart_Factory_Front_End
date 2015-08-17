'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var header = require('../includes/header');
var template = require('../member/template');
var api = require('../member/api');

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