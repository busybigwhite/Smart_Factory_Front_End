'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
// var api = require('../mold/api');
// var template = require('../mold/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');

/* DOM */
var $moldNewBtn    = $('#mold-new-button');
var $moldTable     = $('#mold-table');
var $moldTableBody = $('#mold-table-body');

initialize();

function initialize() {
	header.include();
	// getInitialData();
	bindEvents();
}

function getInitialData() {
	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	api.getMoldList({ factory_id: ID})
		 .done(initialView)
		 .fail(function(err) { console.log("GET Mold Info error: ", err); });
	// var fakeResponse = [{"id":1,"name":"Hoeger","weight":768,"acquisition":"2008-09-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":2,"name":"O'Connell","weight":753,"acquisition":"1994-07-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":3,"name":"Steuber","weight":473,"acquisition":"1997-10-06 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":4,"name":"Hettinger","weight":349,"acquisition":"1996-08-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":5,"name":"Swift","weight":591,"acquisition":"1996-10-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":6,"name":"Waelchi","weight":694,"acquisition":"2012-10-02 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":7,"name":"Braun","weight":862,"acquisition":"1994-08-09 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":8,"name":"Bernier","weight":953,"acquisition":"1996-10-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":9,"name":"Zboncak","weight":646,"acquisition":"2002-11-08 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"},{"id":10,"name":"Hartmann","weight":681,"acquisition":"2000-07-04 00:00:00","admin_id":1,"check_period":"2015-08-14 17:54:48","maintain_period":"2015-08-14 17:54:48","created_at":"2015-08-14 17:54:48","updated_at":"2015-08-14 17:54:48"}];
	// initialView(fakeResponse);
}

function bindEvents() {
	$moldNewBtn.on('click', gotoMoldNewInfoPage);
	$moldTable.on('click', '.detail-info-button', gotoMoldDetailInfoPage);
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
}

function gotoMoldNewInfoPage() {
	api.goToMoldInfo('new');
}

function gotoMoldDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMoldInfo('detail', ID);
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

function initialView(data) {
	var tableListRows = template.render({ infos : data });
	$moldTableBody.empty().append( tableListRows );
}