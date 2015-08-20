'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../workorder/api');
var queryParameter = require('../lib/helper/query-parameter');
var statusDropdown = require('../workorder/component/dropdown-status');
var typeDropdown = require('../workorder/component/dropdown-type');
var factoryDropdown = require('../workorder/component/dropdown-factory');

require('bootstrap/js/dropdown');

/* DOM */
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
function doNothing(){
	
}


function initView(){
	$("#inputDate").val(getDateTime());
}

function bindEvents() {
	$cancelBtn.on('click', backToList);
	$workorderForm.submit(createData);
	statusDropdown.emitter.on('statusChanged', doNothing);
	typeDropdown.emitter.on('statusChanged', doNothing);
	factoryDropdown.emitter.on('factoryChanged', doNothing);
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
			// var selectedName  = $dropdownSelected.attr('name');
			var selectedName = api.transferKeyC2S($(el).attr('selectname'));
			var selectedValue;
			switch(selectedName){
				case "status":
					selectedValue = getStatusName();
					break;
				case "factory":
					selectedValue = getFactoryId();
					break;
				case "produce_type":
					selectedValue = getTypeName();
					break;
				default:
					selectedValue = "";
					break;
			}
			newData[selectedName] = selectedValue;

		} else {
			console.log('getChangedData error: missing some value');
		}
	});
	return newData;
}

function getStatusName() {
	return statusDropdown.getSelectedStatus();
}

function getTypeName(){
	return typeDropdown.getSelectedType();
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}


 function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

