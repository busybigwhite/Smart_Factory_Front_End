'use strict';
var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var factoryDropdown = require('../lib/component/dropdown-factory');
var loadingSpin = require('../lib/component/loading-spin');
var templates = require('../realtime/templates');

// require('bootstrap/js/dropdown');

var isImageMode = false;
var focusFactoryId = undefined;
var spinner;


/* DOM */
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
	initializeLoadingSpinner();
	bindEvents();

	$tableModeSwitcher.trigger('click');
	$filterItem.eq(0).trigger('click');
}

function initializeLoadingSpinner() {
	spinner = loadingSpin();
	spinner.init( $('#realtime-list-block')[0] );
}

function bindEvents() {
	bindFactoryChangedEventListener();
	bindSwitchViewModeOnDropdownMenu();
	bindSelectFilterOnDropdownMenu();
	bindSearchByFilterOnButton();
	bindLinkToPicturesPageOnButton();
}

function bindFactoryChangedEventListener() {
	factoryDropdown.emitter.on('factoryChanged', setFocusFactoryIdThenRenderRows);
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

function setFocusFactoryIdThenRenderRows(factoryId) {
	focusFactoryId = factoryId;

	createRealtimeListThenRenderRows();
}

function createRealtimeListThenRenderRows(type, searchKey) {

	spinner.start();

	$.get(config.APIUrl + 'workorder/list/?factory_id=' + focusFactoryId + '&type=' + type + '&search_key=' + searchKey)
	 .done(function(response){
		var tableListRows = templates.renderTableList({ infos : response });
		// var imageListRows = templates.renderImageList({ infos : response });

		$tableBody.empty().append( tableListRows );
		// $imageListBlock.empty().html( imageListRows );
	 })
	 .always(function(){
	 	spinner.stop();
	 });
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

function redirectToPicPage() {
	var title = $(this).data('info');
	var type = $(this).data('type');
	var work_order_id = _.isString(title) ? title.split('/')[0] : title;

	redirect('realtimePic', {work_order_id, type, title});
}
