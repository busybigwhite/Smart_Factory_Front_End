'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var templates = require('../realtime/templates');
var queryParameter = require('../lib/helper/query-parameter');

require('bootstrap/js/dropdown');

var isImageMode = false;

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
var $showLivePicBtn = $('.realtime-show-live-pic-btn');
var $showSamplePicBtn = $('.realtime-show-sample-pic-btn');
var $showErrPicBtn = $('.realtime-show-err-pic-btn');

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
	$showLivePicBtn.on('click', getPictures);
	$showSamplePicBtn.on('click', getPictures);
	$showErrPicBtn.on('click', getPictures);
}

function selectFactory(target){
	var factoryId = target.type==='click' ? $(this).data('id') : target.ID;
	var factoryName = target.type==='click' ? $(this).text() : target.Name;

	$factoryFocus.text(factoryName);
	createRealtimeListThenRenderRows(factoryId);
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
	var content = $searchInput.val();

	// $.get(config.realtimeUrl + 'searchinfo/:' + userId + '?type=' + type + '&content=' + content)
	$.get(config.realtimeUrl + 'searchinfo/?type=' + type + '&content=' + content)
	 .done(function(response){
		var tableListRows = templates.renderTableList({ infos : response });
		// var imageListRows = templates.renderImageList({ infos : response });

		$tableBody.empty().append( tableListRows );
		// $imageListBlock.empty().html( imageListRows );
	 });
}

function createRealtimeListThenRenderRows(factoryId) {
	// $.get(config.realtimeUrl + 'liveinfo/:' + userId + '?factory=' + factoryId)
	$.get(config.realtimeUrl + 'liveinfo/?factory=' + factoryId)
	 .done(function(response){
		var tableListRows = templates.renderTableList({ infos : response });
		// var imageListRows = templates.renderImageList({ infos : response });

		$tableBody.empty().append( tableListRows );
		// $imageListBlock.empty().html( imageListRows );
	 });
}

function getPictures() {
	// $.ajax({
	// 	url: '',
	// 	data: '',
	// 	success: function(urlArr){
	// 		console.log(urlArr);
	// 	}
	// });
}

function createFactoryListThenRenderRows() {
	// $.get(config.realtimeUrl + '/ListFactory/:' + userId)
	$.get(config.realtimeUrl + 'listfactory')
	 .done(function(response){
		var factoryListRows = templates.renderFactoryDropdown({ factories : response });

		$factoryList.empty().html( factoryListRows );

		selectFactory(response[0]);
	 });
}




