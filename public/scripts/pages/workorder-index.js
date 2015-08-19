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
var userList = {};
var factoryList = {};

/* DOM */
var $tableBody = $('.workorder-table-body');
var $tableListBlock = $('#workorder-table-mode');
var $addWorkorderButton = $('#workorder-new-button');

initialize();

function initialize() {
	header.include();
	initialUserList();
	initialFactoryList();
	bindEvents();
}

function initialUserList() {
	$.ajax({
	    url: config.APIUrl + 'user/',
	    type: 'GET',
	    async: false,
	    cache: false,
	    timeout: 30000,
	    error: function() {
	    	console.log("error");
	    },
	    success: function(data) {
	    	for (var i in data) {
	    		userList[data[i].id] = data[i].name;
	    	}
	    	console.log(userList);
	    	// userList = data;
	    }
	});
}

function initialFactoryList() {
	$.ajax({
	    url: config.APIUrl + 'factory/list/',
	    type: 'GET',
	    async: false,
	    cache: false,
	    timeout: 30000,
	    error: function() {
	    	console.log("error");
	    },
	    success: function(data) {
	    	for (var i in data) {
	    		factoryList[data[i].id] = data[i].name;
	    	}
	    	console.log(factoryList);
	    	// factoryList = data;
	    }
	});
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
	$.get(config.APIUrl + 'workorder/list/', function(workorderResponse){
		var displayData = []

		for (var i in workorderResponse) {
			$.ajax({
			        url: config.APIUrl + 'workorder/list/' + workorderResponse[i].id + '/',
			        // url: config.APIUrl + 'workorder/1/',
			        type: 'GET',
			        async: false,
			        cache: false,
			        timeout: 30000,
			        error: function(){
			        	console.log("error");
			        },
			        success: function(data){
			        	for (var j in data.work_order_records) {
			        		if (data.work_order_records[j].factory_id == focusFactoryId) {
								var dict = {}
								dict['id'] = workorderResponse[i].id;
								dict['order_id'] = workorderResponse[i].order_id;
								dict['customer_id'] = workorderResponse[i].customer_id;
				        		if (userList[dict['customer_id']]) {
				        			dict['customer_name'] = userList[dict['customer_id']];
				        		}

				        		dict['factory_id'] = data.work_order_records[j].factory_id;
				        		if (factoryList[dict['factory_id']]) {
				        			dict['factory_name'] = factoryList[dict['factory_id']];
				        		}

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
					    	}
			        	}
			        }
			    });
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