'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var config = require('../config/url');
var templates = require('../compare/templates');


/* DOM */
var $listBlock = $('#compare-list-block');
var $defaultBlock = $('#compare-default-block');
var $smartfacList = $('#smartfac-list');
var $foreshotList = $('#foreshot-list');
var $searchBtn = $('#compare-search-btn');
var $searchInput = $('.search-input');

var factoryList = [];
var statusList = [
	{'key': 'non-schedule','displayName': '未排程'},
 	{'key': 'schedule','displayName': '已排程'},
 	{'key': 'producing','displayName': '生產中'},
 	{'key': 'finish','displayName': '結案'},
 	{'key': 'stopping','displayName': '暫停運作'},
 	{'key': 'error','displayName': '異常'}
];

initialize();

function initialize() {
	header.include();
	getFactoryList();
	bindEvents();
}

function bindEvents() {
	$searchBtn.on('click', searchBySerialNum);
}

function searchBySerialNum() {
	var serialNum = $searchInput.val();

	renderSmartDatabaseInfos(serialNum);
	renderForeshotDatabaseInfos(serialNum);
}

function renderSmartDatabaseInfos(serialNum) {
	$.get(config.APIUrl + 'compare/list?work_order_serial_num=' + serialNum)
	 .done( function(res){
	 	if( res.length ){
	 		res[0]['factory_name'] = mappingFactoryName(res.factory_id);
	 		res[0]['status_show'] = mappingStatus(res.status);

	 		var infos = templates.renderList({ infos: res });
	 	}else {
	 		var infos = templates.renderNoDataText(false);
	 	}

	 	$smartfacList.empty().append(infos);
	 })
}

function mappingFactoryName(id) {
	var displayName = _.result( _.find(factoryList, 'id', id), 'name');

	return displayName;
}

function mappingStatus(status) {
	var displayName = _.result( _.find(statusList, 'key', status), 'displayName');

	return displayName;
}

function renderForeshotDatabaseInfos(serialNum) {
	// $.get( + serialNum)
	//  .done( function(res){
	//  	var infos = res.length  ? templates.renderList({ infos: res })
	//  							: templates.renderNoDataText(true);

	//  	$foreshotList.empty().append(infos);
	//  })

	$foreshotList.empty().append( templates.renderNoDataText(true) );
	displayListBlock();
}

function displayListBlock() {
	$listBlock.removeClass('hidden');
	$defaultBlock.addClass('hidden');
}

function getFactoryList() {
	$.get(config.APIUrl + 'factory/list')
	 .done(function(res){ factoryList = res || [] });
}