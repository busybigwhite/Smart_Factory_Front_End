'use strict';
var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var userId = require('../config/auth');
var config = require('../config/url');
var factoryDropdown = require('../lib/component/dropdown-factory');
var templates = require('../workorder/templates');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var loadingSpin = require('../lib/component/loading-spin');

require('jquery/src/sizzle/test/jquery');
require('bootstrap/js/dropdown');

var isImageMode = false;
var focusFactoryId = undefined;
var spinner;

/* DOM */
var $tableBody = $('.workorder-table-body');
var $tableListBlock = $('#workorder-table-mode');
var $addWorkorderButton = $('#workorder-new-button');
var $filterFocus = $('#workorder-filter-focus');
var $filterItem = $('.filter-item');
var $searchInput = $('#workorder-search-input');
var $searchBtn = $('#workorder-search-btn');
var $listBlock = $('#workorder-list-block');
var $zeroBlock = $('#workorder-zero-block');

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
	spinner.init( $('#workorder-list-block')[0] );
}

/** Binding **/

/**
 * bind events 
 */
function bindEvents() {
	bindFactoryChangedEventListener();
	bindLinkToCreateWorkorderPageOnButton();
	bindLinkToShowWorkorderInfoPageOnButton();
	bindSelectFilterOnDropdownMenu();
	bindSearchByFilterOnButton();
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

function bindSelectFilterOnDropdownMenu() {
	$filterItem.on('click', selectFilter);
}

function bindSearchByFilterOnButton() {
	$searchBtn.on('click', searchByFilter);
}

function setFocusFactoryIdThenRenderRows(factoryId) {
	focusFactoryId = factoryId;
	var fetchRequest = {};
	fetchRequest['factory_id'] = focusFactoryId;

	getWorkorderListThenRenderRows(fetchRequest);
}

function getWorkorderListThenRenderRows(fetchRequest) {
	spinner.start();
	
	$.get(config.APIUrl + 'workorder/list/', fetchRequest, function(workorderResponse) {
		var displayData = []

		for (var i in workorderResponse) {
			var dict = {}
			dict['id'] = workorderResponse[i].id ? workorderResponse[i].id : '-';
			dict['serial_num'] = workorderResponse[i].serial_num ? workorderResponse[i].serial_num : '-';
			dict['order_id'] = workorderResponse[i].order_id ? workorderResponse[i].order_id : '-';
			dict['customer_name'] = workorderResponse[i].customer_name ? workorderResponse[i].customer_name : '-';
    		dict['factory_id'] = focusFactoryId ? focusFactoryId : '-';
    		dict['order_date'] = workorderResponse[i].order_date ? workorderResponse[i].order_date : '-';

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
				case "stopping":
					dict['status'] = "暫停運作";
				break;
				case "error":
					dict['status'] = "異常";
				break;
				default:
					dict['status'] = "-";
				break;
			}

    		displayData.push(dict);
		}
		spinner.stop();

		if (displayData.length > 0) {
			$zeroBlock.hide();
			$listBlock.show();

			var tableListRows = templates.renderTableList({ infos : displayData });
			$tableBody.empty().append( tableListRows );
		} else {
			$listBlock.hide();
			$zeroBlock.show();
		}
	 });
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

	if (type == "status") {
		switch (searchKey) {
			case "未排程":
				fetchRequest[type] = "non-schedule";
			break;
			case "已排程":
				fetchRequest[type] = "schedule";
			break;
			case "生產中":
				fetchRequest[type] = "producing";
			break;
			case "結案":
				fetchRequest[type] = "finish";
			break;
			case "暫停運作":
				fetchRequest[type] = "stopping";
			break;
			case "異常":
				fetchRequest[type] = "error";
			break;
			default:
				fetchRequest[type] = searchKey;
			break;
		}
	} else {
		fetchRequest['factory_id'] = focusFactoryId;
		fetchRequest[type] = searchKey;
	}

	getWorkorderListThenRenderRows(fetchRequest);
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