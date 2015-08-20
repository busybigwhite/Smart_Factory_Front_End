'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var factoryDropdown = require('../workorder/component/dropdown-status');

require('bootstrap/js/dropdown');

/* DOM */
var $editBtn   = $('#workorder-new-edit-button');//always hide
var $cancelBtn = $('#workorder-new-cancel-button');
var $newBtn   = $('#workorder-new-new-button');
var $workorderForm  = $('#workorder-new-form');
var $newOrderCollection = $workorderForm.find('.newOrder');

initialize();

function initialize() {
	header.include();
	bindEvents();
	getInitialData();
	initView();
}
function getInitialData() {
	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	
}


function initView(){
	$editBtn.hide();
	$newBtn.show();
}

function bindEvents() {
	$cancelBtn.on('click', backToList);
	$workorderForm.submit(createData);
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
}


function backToList() {
	// window.location="./";
	api.goToWorkOrderIndex();
}

function createData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);
	saveNewData(data);
	return false;
}

function saveNewData(data) {
	api.createWorkOrder(data)
		 .done(function(data) { 
		 	console.log("CREATE Machine res: ", data); 
		 	api.goToWorkOrderIndex();
		 })
		 .fail(function(err) { 
		 	console.log("CREATE Machine error: ", err); 
		 	//TODO ??
		 });
}

function getChangedData() {
	var newData = {};
	$newOrderCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();
		var $dropdownSelected = $(el).find('.selected-option');
		if (name) {
			name = api.transferKeyC2S(name);
			value = value ? value : '';
			newData[name] = value;

		} else if ($dropdownSelected) {
			var selectedName  = $dropdownSelected.attr('name');
			var selectedValue = $dropdownSelected.text();
			newData[selectedName] = selectedValue;

		} else {
			console.log('getChangedData error: missing some value');
		}
	});
	return newData;
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

