'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var templates = require('../realtime/templates');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');

require('bootstrap/js/dropdown');

var isImageMode = false;
var focusFactoryId = undefined;

/* DOM */
var $factoryFocus = $('#realtime-factory-focus');
var $factoryList = $('#realtime-factory-list');
var $modeFocus = $('#realtime-mode-focus');
var $tableListBlock = $('#realtime-table-mode');
var $imageListBlock = $('#realtime-img-mode');
var $tableBody = $('.realtime-table-body');
var $tableModeSwitcher = $('#table-mode-switcher');
var $imageModeSwitcher = $('#image-mode-switcher');
var $filterFocus = $('#realtime-filter-focus');
var $filterItem = $('.filter-item');
var $searchInput = $('#realtime-search-input');
var $searchBtn = $('#realtime-search-btn');

initialize();

function initialize() {
	header.include();
	bindEvents();
	createFactoryListThenRenderRows();

	$tableModeSwitcher.trigger('click');
	$filterItem.eq(0).trigger('click');
}

function bindEvents() {
	bindSelectFactoryOnDropdownMenu();
	bindSwitchViewModeOnDropdownMenu();
	bindSelectFilterOnDropdownMenu();
	bindSearchByFilterOnButton();
	bindLinkToPicturesPageOnButton();
}

function bindSelectFactoryOnDropdownMenu() {
	$factoryList.on('click', '.realtime-factory-item', selectFactory);
}

function bindSwitchViewModeOnDropdownMenu() {
	$tableModeSwitcher.on('click', switchViewMode);
	$imageModeSwitcher.on('click', switchViewMode);
}

function bindSelectFilterOnDropdownMenu() {
	$filterItem.on('click', selectFilter);
}

function bindSearchByFilterOnButton() {
	$searchBtn.on('click', searchByFilter);
}

function bindLinkToPicturesPageOnButton() {
	$tableListBlock.on('click', '.realtime-showpic-btn', redirectToPicPage);
	// $imageListBlock.on('click', '.realtime-showpic-btn', redirectToPicPage);
}

function selectFactory(target){
	focusFactoryId = target.type==='click' ? $(this).data('id') : target.id;
	var factoryName = target.type==='click' ? $(this).text() : target.name;

	$factoryFocus.text(factoryName);
	createRealtimeListThenRenderRows();
}

function switchViewMode(){
	var mode = $(this).text();
	$modeFocus.text(mode);

	isImageMode = $(this).data('mode');

	if( isImageMode ) {
		$tableListBlock.addClass('hidden');
		$imageListBlock.removeClass('hidden');
	}else {
		$tableListBlock.removeClass('hidden');
		$imageListBlock.addClass('hidden');
	}
}

function selectFilter(){
	var filterName = $(this).text();
	var filterType = $(this).data('id');

	$filterFocus.data('type', filterType).text(filterName);
}

function searchByFilter(){
	var type = $filterFocus.data('type');
	var searchKey = $searchInput.val();

	createRealtimeListThenRenderRows(type, searchKey)
}

function createRealtimeListThenRenderRows(type, searchKey) {
	// $.get(config.APIUrl + 'workorder/list/:' + userId + '?factory_id=' + focusFactoryId + 'type=' + type + '&search_key=' + searchKey)
	$.get(config.APIUrl + 'workorder/list/?factory_id=' + focusFactoryId + 'type=' + type + '&search_key=' + searchKey)
	 .done(function(response){
		var tableListRows = templates.renderTableList({ infos : response });
		// var imageListRows = templates.renderImageList({ infos : response });

		$tableBody.empty().append( tableListRows );
		// $imageListBlock.empty().html( imageListRows );
	 });
}

function redirectToPicPage() {
	var title = $(this).data('info');
	var workorder_id = title.split('/')[0];
	var type = $(this).data('type');

	redirect('realtimePic', {workorder_id, type, title});
}

function createFactoryListThenRenderRows() {
	// $.get(config.APIUrl + 'factory/list/:' + userId)
	$.get(config.APIUrl + 'factory/list')
	 .done(function(response){
		var factoryListRows = templates.renderFactoryDropdown({ factories : response });

		$factoryList.empty().html( factoryListRows );

		selectFactory(response[0]);
	 });
}




