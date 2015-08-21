'use strict';

var $ = window.jQuery = require('jquery');
require('bootstrap/js/dropdown');

var _ = require('lodash');
var userId = require('../../config/auth');
var config = require('../../config/url');
var EventEmitter = require('wolfy87-eventemitter');

var selectedType;

var emitter = new EventEmitter();

/* DOM */
var $typeFocusName = $('.type-focus-name');
var $typeList = $('.type-list');

var typeListContent = [{'key': '','value': ''},
				{'key': '塑膠射出','value': '塑膠射出'},
    		 	{'key': '印刷','value': '印刷'},
    		 	{'key': '成型品','value': '成型品'}];

exports = module.exports = {};

exports.emitter = emitter;

exports.getSelectedType = function(){
	return selectedType;
}
exports.setDropdownbyValue = setDropdownbyValue;

function setDropdownbyValue(key,value){
	//ex. key='produce_type' value='塑膠'
	$typeFocusName.text(value).data('key', key);
	selectedType = value;
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
	$typeList.on('click', '.option-item', setFocusNameBlock);
}

function setFocusNameBlock(target) {
	selectedType = target.type==='click' ? $(this).data('key') : target.key;
	var displayName = target.type==='click' ? $(this).text() : target.value;

	$typeFocusName.text(displayName).data('key', selectedType);

	emitter.emit('TypeChanged', selectedType);
}

function createFactoryListThenRenderRows() {
		var TypeListRows = renderFactoryDropdown({ allType : typeListContent });

		$typeList.empty().html( TypeListRows );

		setFocusNameBlock(typeListContent[0]);
}

function renderFactoryDropdown(allType) {
  var menuTemp = _.template(
	 `<% _.forEach(allType, function(type) {  %>
      <li><a class="option-item" data-key=<%= type.key %>>
      		<%= type.value %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(allType);
}

