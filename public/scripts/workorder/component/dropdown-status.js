'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var EventEmitter = require('wolfy87-eventemitter');

var selectedStatus;
var emitter = new EventEmitter();

/* DOM */
var $statusFocusName = $('.status-focus-name');
var $statusList = $('.status-list');

var statusListContent = [{'key': '','displayName': ''},
				{'key': 'non-schedule','displayName': '未排程'},
    		 	{'key': 'schedule','displayName': '已排程'},
    		 	{'key': 'producing','displayName': '生產中'},
    		 	{'key': 'finish','displayName': '結案'}];

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedStatus = function(){
	return selectedStatus;
}

initialize();

function initialize() {
	bindEvents();
	createFactoryListThenRenderRows();
}

function bindEvents() {
	bindSetFocusNameBlockEventOnSelector();
}

function bindSetFocusNameBlockEventOnSelector() {
	$statusList.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock(target) {
	selectedStatus = target.type==='click' ? $(this).data('key') : target.key;
	var displayName = target.type==='click' ? $(this).text() : target.displayName;

	$statusFocusName.text(displayName).data('key', selectedStatus);

	emitter.emit('statusChanged', selectedStatus);
}

function createFactoryListThenRenderRows() {
		var statusListRows = renderFactoryDropdown({ allstatus : statusListContent });

		$statusList.empty().html( statusListRows );

		setFocusNameBlock(statusListContent[0]);
}

function renderFactoryDropdown(allstatus) {
  var menuTemp = _.template(
	 `<% _.forEach(allstatus, function(status) {  %>
      <li><a class="option-item" data-key=<%= status.key %>>
      		<%= status.displayName %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(allstatus);
}

