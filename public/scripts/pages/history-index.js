'use strict';
var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var queryParameter = require('../lib/helper/query-parameter');
var factoryDropdown = require('../lib/component/dropdown-factory');
var loadingSpin = require('../lib/component/loading-spin');
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
var spinner;

initialize();

function initialize() {
	header.include();
	initializeLoadingSpinner();
	bindEvents();
	filterDropdown.triggerClick();
}

function initializeLoadingSpinner() {
    spinner = loadingSpin();
    spinner.init( $('#history-list-block')[0] );
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
	spinner.start();

	var queryURL = createQueryURL(searchPeriod);

	$.get(config.APIUrl + 'history/list?' + queryURL)
	 .done(function(response){

	 	if(response.length === 0) return;

		var type = selectedFilter.split('_')[0];

		if(type === 'machine'){
			$.when( caculateAvailability(response) )
			 .then(function(){
			 	createTableList(response, type);
				displayImageBlock(response, type);
			 });

		}else {
			createTableList(response, type);
			displayImageBlock(response, type);
		}
	})
	 .fail(function(err){ console.log('history list error:', err) })
	 .always(function(){ spinner.stop() });
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

function caculateAvailability(info) {
	var defer = $.Deferred();

	$.get(config.APIUrl + 'machine/availability_rate/' + info[0].machine.id)
	 .done(function(res){

	 	_.forEach(infos, function(info) {
	 		info['availability'] = res.availability_rate;
	 	})

	 	defer.resolve();
	 })
	 .fail(function(err){ defer.reject() })

	return defer.promise();
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

	$.get(config.APIUrl + 'pic/heatmap/list?' + 'mold_id=' + id)
	 .done(function(response){
	 	var heatmap = templates.renderHeatmap({ heatmapUrls: response });

		$imageBlock.append( heatmap ).removeClass('hidden');

	}).fail(function(err){ console.log('get heatmap error:', err) });
}