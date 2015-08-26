'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../mold/api');
var template = require('../mold/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');

/* DOM */
var $moldNewBtn    = $('#mold-new-button');
var $moldTable     = $('#mold-table');
var $moldTableBody = $('#mold-table-body');

initialize();

function initialize() {
	header.include();
	bindEvents();
}

function bindEvents() {
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
	$moldNewBtn.on('click', gotoMoldNewInfoPage);
	$moldTable.on('click', '.detail-info-button', gotoMoldDetailInfoPage);
}

function getInitialData() {
	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	api.setFactoryId(ID);
	api.getMoldList()
		 .done(initialView)
		 .fail(function(err) { console.log("GET Mold List error: ", err); });
}

function gotoMoldNewInfoPage() {
	api.goToMoldInfo('new', {factoryId: getFactoryId()});
}

function gotoMoldDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMoldInfo('detail', {factoryId: getFactoryId(), ID: ID});
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

function initialView(data) {
	var tableListRows = template.render({ infos : data , api: api});
	$moldTableBody.empty().append( tableListRows );
}