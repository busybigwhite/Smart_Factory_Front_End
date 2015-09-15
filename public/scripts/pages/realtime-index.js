'use strict';
var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var assign = require('object-assign');
var header = require('../includes/header');
var config = require('../config/url');
var commonConfig = require('../config/common');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var factoryDropdown = require('../lib/component/dropdown-factory');
var searchFilterComponent = require('../lib/component/search-filter-component');
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
var $dateSortBtn = $('#realtime-date-sort-btn');

initialize();

function initialize() {
	header.include();
	initializeLoadingSpinner();
	bindEvents();
	resetStatus();
	searchFilterComponent.setDefaultOption();
	setReloadTimer();
}

function initializeLoadingSpinner() {
	spinner = loadingSpin();
	spinner.init( $listBlock[0] );
}

function bindEvents() {
	bindFactoryChangedEventListener();
	bindSwitchViewModeOnDropdownMenu();
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

function bindSearchByFilterOnButton() {
	searchFilterComponent.emitter.on('search', searchByFilter);
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

function getRealtimeListThenRenderRows(searchObj) {

	spinner.start();

	var queryURL = createQueryURL(searchObj);

	$.get(config.APIUrl + 'workorder/list?' + queryURL)
	 .done(function(response){
	 	if( response.length ){
	 		var infos = queryParameter.get('date_sort') === "asc"
	 						? _.sortByOrder(response, 'start_date', 'asc')
	 						: _.sortByOrder(response, 'start_date', 'desc');

			var tableListRows = templates.renderTableList({ infos : infos });
			var imageListRows = templates.renderImageList({ infos : infos });

			$tableBody.empty().append( tableListRows );
			$imageListBlock.empty().html( imageListRows );
		}

		switchNoDataListBlock(response.length > 0);
	 })
	 .always(function(){ spinner.stop() });
}

function createQueryURL(data) {
	var data = assign({}, data); // prevent data is undefined
	data['factory_id'] = focusFactoryId;
	data['realtime'] = 'yes';

	return queryParameter.build(data);
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

function searchByFilter(searchObj){
	getRealtimeListThenRenderRows(searchObj)
}

function sortDate() {
	var pervSort = queryParameter.get('date_sort') || 'desc';
	var nextSort = pervSort === 'desc' ? 'asc' : 'desc';
	var queries = queryParameter.assign({ date_sort: nextSort });

	redirect('realtime', queries);
}

function redirectToPicPage() {
	var title = $(this).data('info');
	var type = $(this).data('type');
	var work_order_id = $(this).data('workid');
	var image_view = isImageMode;
	var factory_id = focusFactoryId;

	redirect('realtimePic', { work_order_id, type, title, image_view, factory_id });
}

function resetStatus() {
	setViewMode();
	setFocusFacroty();
	setDateSort();
}

function setViewMode() {
	queryParameter.get('image_view') === "1" ? $imageModeSwitcher.trigger('click')
											 : $tableModeSwitcher.trigger('click');
}

function setFocusFacroty() {
	queryParameter.get('factory_id') || searchFilterComponent.reset();
}

function setDateSort() {
	var sort = queryParameter.get('date_sort') || 'desc';
	$dateSortBtn.attr('class','caret '+ sort );
}

function setReloadTimer() {
	setTimeout(function(){
		var query = queryParameter.assign({
			factory_id: focusFactoryId,
			image_view: isImageMode
		});
		redirect('realtime', query);
	}, commonConfig.realtimeReloadTime);
}

