'use strict';
var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var commonConfig = require('../config/common');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var factoryDropdown = require('../lib/component/dropdown-factory');
var loadingSpin = require('../lib/component/loading-spin');
var templates = require('../realtime/templates');

var isImageMode;
var focusFactoryId = undefined;
var spinner;
var reloadTimer;

/* DOM */
var $listBlock = $('#realtime-list-block');
var $noDataBlock = $('#realtime-no-data-block');
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
var $dateSortBtn = $('#realtime-date-sort-btn');

initialize();

function initialize() {
	header.include();
	initializeLoadingSpinner();
	bindEvents();
	setViewMode();
	setReloadTimer();

	$filterItem.eq(0).trigger('click');
}

function initializeLoadingSpinner() {
	spinner = loadingSpin();
	spinner.init( $listBlock[0] );
}

function bindEvents() {
	bindFactoryChangedEventListener();
	bindSwitchViewModeOnDropdownMenu();
	bindSelectFilterOnDropdownMenu();
	bindSearchByFilterOnButton();
	bindSortDateOnButton();
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

function bindSortDateOnButton() {
	$dateSortBtn.on('click', sortDate);
}

function bindLinkToPicturesPageOnButton() {
	$tableListBlock.on('click', '.realtime-showpic-btn', redirectToPicPage);
	$imageListBlock.on('click', '.realtime-showpic-btn', redirectToPicPage);
}

function setFocusFactoryIdThenRenderRows(factoryId) {
	focusFactoryId = factoryId;

	getRealtimeListThenRenderRows();
}

function getRealtimeListThenRenderRows(filter, searchKey) {

	spinner.start();

	var queryURL = createQueryURL(filter, searchKey);

	$.get(config.APIUrl + 'workorder/list?' + queryURL)
	 .done(function(response){
	 	if( response.length ){
	 		var infos = queryParameter.get('date_sort') === "asc"
	 						? _.sortByOrder(response, 'start_date', 'asc')
	 						: _.sortByOrder(response, 'start_date', 'desc');

			var tableListRows = templates.renderTableList({ infos : infos });
			var imageListRows = templates.renderImageList({ infos : infos });

			switchNoDataListBlock(true);

			$tableBody.empty().append( tableListRows );
			$imageListBlock.empty().html( imageListRows );
		}else {
			switchNoDataListBlock(false);
		}
	 })
	 .always(function(){ spinner.stop() });
}

function switchNoDataListBlock(hasData) {
	if( hasData ){
		$listBlock.removeClass('hidden');
		$noDataBlock.addClass('hidden');
	}else {
		$listBlock.addClass('hidden');
		$noDataBlock.removeClass('hidden');
	}
}

function createQueryURL(filter, searchKey) {
	var data = {};

	data['factory_id'] = focusFactoryId;
	data[filter] = searchKey;
	data['realtime'] = 'yes';

	return queryParameter.build(data);
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

	getRealtimeListThenRenderRows(type, searchKey)
}

function sortDate() {
	var sortNow = queryParameter.get('date_sort') || 'desc';

	if( sortNow === 'desc'){
		$(this).attr('class','caret asc');
	}else {
		$(this).attr('class','caret desc');
	}
}

function redirectToPicPage() {
	var title = $(this).data('info');
	var type = $(this).data('type');
	var work_order_id = $(this).data('workid');
	var image_view = isImageMode;

	redirect('realtimePic', { work_order_id, type, title, image_view });
}

function setViewMode() {
	queryParameter.get('image_view') === "1" ? $imageModeSwitcher.trigger('click')
											 : $tableModeSwitcher.trigger('click');
}

function setReloadTimer() {
	setTimeout(function(){ window.location.reload() }, commonConfig.realtimeReloadTime);
}