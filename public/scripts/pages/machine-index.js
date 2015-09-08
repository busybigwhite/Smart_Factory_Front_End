'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var template = require('../machine/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');
var loadingSpin = require('../lib/component/loading-spin');

var spinner;

/* DOM */
var $machineNewBtn    = $('#machine-new-button');
var $machineTable     = $('#machine-table');
var $machineTableBody = $('#machine-table-body');
var $filterFocus = $('#machine-filter-focus');
var $filterItem = $('.filter-item');
var $searchInput = $('#machine-search-input');
var $searchBtn = $('#machine-search-btn');
var $listBlock = $('#machine-list-block');
var $zeroBlock = $('#machine-zero-block');

initialize();

function initialize() {
	header.include();
	initializeLoadingSpinner();
	bindEvents();

	$listBlock.show();
	$zeroBlock.hide();
	$filterItem.eq(0).trigger('click');
}

function initializeLoadingSpinner() {
	spinner = loadingSpin();
	spinner.init( $('#machine-list-block')[0] );
}

function bindEvents() {
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTable.on('click', '.detail-info-button', gotoMachineDetailInfoPage);

	bindSelectFilterOnDropdownMenu();
	bindSearchByFilterOnButton();
}

function bindSelectFilterOnDropdownMenu() {
	$filterItem.on('click', selectFilter);
}

function bindSearchByFilterOnButton() {
	$searchBtn.on('click', searchByFilter);
}

function getInitialData(data) {
	spinner.start();

	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	api.setFactoryId(ID);
	api.getMachineList(data)
		 .done(initialView)
		 .fail(function(err) { spinner.stop(); console.log("GET Machine List error: ", err); });
}

function selectFilter(){
	var filterName = $(this).text();
	var filterType = $(this).data('id');

	$filterFocus.data('type', filterType).text(filterName);
}

function searchByFilter(){
	var type = $filterFocus.data('type');
	var searchKey = $searchInput.val();
	var fetchRequest = {};

	fetchRequest[type] = searchKey;

	getInitialData(fetchRequest);
}

function gotoMachineNewInfoPage() {
	api.goToMachineInfo('new', {factoryId: getFactoryId()});
}

function gotoMachineDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMachineInfo('detail', {factoryId: getFactoryId(), ID: ID});
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

function initialView(array) {
	for (var data in array) {
		if (!array[data].serial_num) {
			array[data].serial_num = '-';
		}
		if (!array[data].name) {
			array[data].name = '-';
		}
		if (!array[data].weight) {
			array[data].weight = '-';
		}

		if (array[data].availability_rate) {
			array[data].availability_rate = array[data].availability_rate.toFixed(2);
		} else {
			array[data].availability_rate = '-';
		}
	}

	spinner.stop();
	if (array.length > 0) {
		$zeroBlock.hide();
		$listBlock.show();
	
		var tableListRows = template.render({ infos : array});
		$machineTableBody.empty().append( tableListRows );
	} else {
		$listBlock.hide();
		$zeroBlock.show();
	}
}