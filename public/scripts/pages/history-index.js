'use strict';
var $ = window.jQuery = require('jquery');
// var moment = window.moment = require('moment');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var queryParameter = require('../lib/helper/query-parameter');
var factoryDropdown = require('../lib/component/dropdown-factory');
var templates = require('../history/templates');
var filterDropdown = require('../history/components/dropdown-filter-type');
var valueDropdown = require('../history/components/dropdown-filter-value');
var datePicker = require('../history/components/date-picker');

/* DOM */
var $tableListBlock = $('#history-table-block');
var $tableBody = $('#history-table-body');
var $imageBlock = $('#history-img-block');

var focusFactoryId;
var selectedFilter;
var selectedValue;


initialize();

function initialize() {
	header.include();
	bindEvents();
	filterDropdown.triggerClick();
}

function bindEvents() {
	bindDropdownsChangedEventListener();
	bindPeriodSearchEventListener();
}

function bindDropdownsChangedEventListener() {
	factoryDropdown.emitter.on('factoryChanged', setFocusFactoryIdThenRenderRows);
	filterDropdown.emitter.on('filterChanged', switchDropdownAndDatepicker);
	valueDropdown.emitter.on('valueChanged', setSelectedValueThenRenderRows);
}

function bindPeriodSearchEventListener() {
	datePicker.emitter.on('periodSearch', searchHistoryThenRenderRows);
}

function setFocusFactoryIdThenRenderRows(factoryId) {
	focusFactoryId = factoryId;

	searchHistoryThenRenderRows();
}

function switchDropdownAndDatepicker(filterId) {
	selectedFilter = filterId;

	if(selectedFilter === 'date_period'){
		datePicker.show();
		valueDropdown.hide();
	}else {
		datePicker.hide();
		valueDropdown.showAndRenderDropdown(selectedFilter);
	}
}

function setSelectedValueThenRenderRows(valueId) {
	selectedValue = valueId;

	searchHistoryThenRenderRows();
}

function searchHistoryThenRenderRows(searchPeriod) {

	if( !selectedFilter || (selectedFilter==='date_period' && searchPeriod===undefined) ) return;

	cleanTableAndIamgeBlock();

	var queryURL = createQueryURL(searchPeriod);

	$.get(config.APIUrl + 'history/list/?' + queryURL)
	 .done(function(response){
	 	var infos = response || [];
		var type = selectedFilter.split('_')[0];

		createTableList(infos, type);
		displayImageBlock(infos, type);

	}).fail(function(err){ console.log('history list error:', err) });
}

function cleanTableAndIamgeBlock() {
	$imageBlock.empty();
	$tableBody.empty();
}

function createQueryURL(searchPeriod) {
	var data = {};

	if( searchPeriod ){
		data = {'factory_id': focusFactoryId, 'start_date': searchPeriod.start_date, 'end_date': searchPeriod.end_date};
	}else {
		data['factory_id'] = focusFactoryId;
		data[selectedFilter] = selectedValue;
	}

	return queryParameter.build(data);
}

function createTableList(infos, type) {
	var tableListRows = templates.renderTableList({ infos : infos });

	$tableBody.empty().append( tableListRows );
 	$tableListBlock.find('.table-col').attr('class', 'table-col ' + type);
	$tableListBlock.find('.table-col-sm').attr('class', 'table-col-sm ' + type);
}

function displayImageBlock(infos, type) {
	switch (type){
		case "workorder":
			var chart = templates.renderChart();
			$imageBlock.empty().append( chart ).removeClass('hidden');
		break;
		case "mold":
			getHeatmap(infos[0].mold_id);
		break;
		default:
			$imageBlock.addClass('hidden');
		break;
	}
}

function getHeatmap(id) {

	$.get(config.APIUrl + 'pic/heatmap/list/?' + 'mold_id=' + id)
	 .done(function(response){
	 	var heatmap = templates.renderHeatmap({ heatmapUrls: response });

		$imageBlock.append( heatmap ).removeClass('hidden');

	}).fail(function(err){ console.log('get heatmap error:', err) });
}