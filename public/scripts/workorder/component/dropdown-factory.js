'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var EventEmitter = require('wolfy87-eventemitter');



var selectedFactoryId;
var emitter = new EventEmitter();

/* DOM */
var $factoryFocusName = $('.factory-focus-name');
var $factoryList = $('.factory-list');

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedFactoryId = function(){
	return selectedFactoryId;
}
exports.setDropdownbyKey = setDropdownbyKey;

function setDropdownbyKey(key){
	$factoryFocusName.text(key).data('key', key);
	console.log(key);
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
	$factoryList.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock(target) {
	selectedFactoryId = target.type==='click' ? $(this).data('id') : target.id;
	var displayName = target.type==='click' ? $(this).text() : target.name;

	$factoryFocusName.text(displayName).data('id', selectedFactoryId);

	emitter.emit('factoryChanged', selectedFactoryId);
}

function createFactoryListThenRenderRows() {
	$.get(config.APIUrl + 'factory/list')
	 .done(function(response){
		var factoryListRows = renderFactoryDropdown({ factories : response });
		$factoryList.empty().html( factoryListRows );
		setFocusNameBlock(response[0]);
	 });
}

function renderFactoryDropdown(factories) {
  var menuTemp = _.template(
	 `<% _.forEach(factories, function(factory) {  %>
      <li><a class="option-item" data-id=<%= factory.id %>>
      		<%= factory.name %>
      </a></li>
    <% });                                          %>`
	);


  return menuTemp(factories);
}

