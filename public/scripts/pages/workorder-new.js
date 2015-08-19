'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');

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
	initView();
}

function initView(){
	$editBtn.hide();
	$newBtn.show();
}

function bindEvents() {
	$cancelBtn.on('click', backToList);
	$workorderForm.submit(createData);
}


function backToList() {
	//TODO return to workorder list
	console.log("backToList");
	window.location="./";
	// api.goToWorkOrderIndex();
}

function createData() {
	var data = getChangedData();
	console.log('Changed or New Data : ', data);
	//TODO create new data
	//should ask to set workerorder id
	saveNewData(data);
	return false;
}

function saveNewData(data) {
	api.createWorkOrder(data)
		 .done(function(data) { console.log("CREATE Machine res: ", data); })
		 .fail(function(err) { console.log("CREATE Machine error: ", err); });
}

function getChangedData() {
	var newData = {};
	$newOrderCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();
		var $dropdownSelected = $(el).find('.selected-option');

		if (name) {
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

