'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var factoryDropdown = require('../lib/component/dropdown-factory');
var templates = require('../workorder/templates');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');

require('jquery/src/sizzle/test/jquery');
require('bootstrap/js/dropdown');

var isImageMode = false;
var focusFactoryId = undefined;

/* DOM */
var $tableBody = $('.workorder-table-body');
var $tableListBlock = $('#workorder-table-mode');
var $addWorkorderButton = $('#workorder-new-button');

initialize();

function initialize() {
	header.include();
	bindEvents();
}

function bindEvents() {
	bindFactoryChangedEventListener();
	bindLinkToCreateWorkorderPageOnButton();
	bindLinkToShowWorkorderInfoPageOnButton();
}

function bindFactoryChangedEventListener() {
	factoryDropdown.emitter.on('factoryChanged', setFocusFactoryIdThenRenderRows);
}

function bindLinkToCreateWorkorderPageOnButton() {
	$addWorkorderButton.click(redirectToCreateWorkorderPage);
}

function bindLinkToShowWorkorderInfoPageOnButton() {
	$tableListBlock.on('click', '.workorder-showinfo-btn', redirectToShowWorkorderInfoPage);
}

function setFocusFactoryIdThenRenderRows(factoryId) {
	focusFactoryId = factoryId;

	createWorkorderListThenRenderRows();
}

function createWorkorderListThenRenderRows(type, searchKey) {
	$.get(config.APIUrl + 'workorder/list/', {'factory_id': focusFactoryId}, function(workorderResponse) {
		var displayData = []

		for (var i in workorderResponse) {
        	// for (var j in workorderResponse[i].work_order_records) {
        		// if (workorderResponse[i].work_order_records[j].factory_id == focusFactoryId) {
					var dict = {}
					dict['id'] = workorderResponse[i].id;
					dict['order_id'] = workorderResponse[i].order_id;
					dict['customer_name'] = workorderResponse[i].customer_name;
	        		// dict['factory_id'] = workorderResponse[i].work_order_records[j].factory_id;
	        		dict['factory_id'] = focusFactoryId;

					switch (workorderResponse[i].status) {
						case "non-schedule":
							dict['status'] = "未排程";
						break;
						case "schedule":
							dict['status'] = "已排程";
						break;
						case "producing":
							dict['status'] = "生產中";
						break;
						case "finish":
							dict['status'] = "結案";
						break;
						default:
						break;
					}

		    		displayData.push(dict);
		    	// }
        	// }
		}

		var tableListRows = templates.renderTableList({ infos : displayData });

		$tableBody.empty().append( tableListRows );
	 });
}

function redirectToCreateWorkorderPage() {
	redirect('workorderNew');
}

function redirectToShowWorkorderInfoPage() {
	var title = $(this).data('info');
	var workorder_id = title.split('/')[0];
	var factory_id = title.split('/')[1];

	redirect('workorderInfo', {workorder_id, factory_id});
}