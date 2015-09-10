'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var auth = require('../config/auth');
var api = require('../mold/api');
var template = require('../mold/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');
var scrappedDropdown = require('../mold/modules/scrapped-dropdown');
var searchFilterComponent = require('../lib/component/search-filter-component');

/* DOM */
var $moldNewBtn    = $('#mold-new-button');
var $moldTable     = $('#mold-table');
var $moldTableBody = $('#mold-table-body');

initialize();

function initialize() {
	header.include();
	bindEvents();
	bindDropdownsChangedEventListener();
	// scrappedDropdown.triggerClick();
	searchFilterComponent.setDefaultOption();
}

function bindEvents() {
	$moldNewBtn.on('click', gotoMoldNewInfoPage);
	$moldTable.on('click', '.detail-info-button', gotoMoldDetailInfoPage);
}

function bindDropdownsChangedEventListener() {
	factoryDropdown.emitter.on('factoryChanged', setFocusFactoryIdThenRenderRows);
	scrappedDropdown.emitter.on('filterChanged', setScrappedTypeThenRenderRows);
	searchFilterComponent.emitter.on('search', searchByFilter);
}

function setFocusFactoryIdThenRenderRows(factoryId) {
	api.setFactoryId(factoryId);
	searchFilterComponent.reset();

	getMoldList();
}

function setScrappedTypeThenRenderRows(type) {
	api.setScrappedType(type);
	searchFilterComponent.reset();

	getMoldList();
}

function searchByFilter(searchObj){
	getMoldList(searchObj);
}

function gotoMoldNewInfoPage() {
	api.goToMoldInfo('new');
}

function gotoMoldDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMoldInfo('detail', {ID: ID});
}

function getMoldList(searchObj) {
	$.when(auth.refreshToken())
	 .then(api.setToken)
	 .then(function(){
	 	api.getMoldList(searchObj)
	 	   .done(initialView)
	 	   .fail(function(err) { console.log("GET Mold List error: ", err); });
	 });
}

function initialView(data) {
	var tableListRows = template.render({ infos : data , api: api});
	$moldTableBody.empty().append( tableListRows );
}