'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var api = require('../api');
require('bootstrap/js/dropdown');

 /* DOM */
var $noticedPersonBlock = $('#machine-noticed-person');
var $noticedPersonDropdown = $('#machine-notice-dropdown');
var $selectedOption = $('#machine-notice-dropdown-btn').find('.selected-option');

var noticedId;
var peopleList;
var firstPerson;
var isNeedDefault = false;

exports.init       = initialize;
exports.getId      = getId;
exports.getName    = getName;
exports.setDefault = setDefault;
exports.setNoticeedPerson = setNoticeedPerson;

function initialize() {
	bindEvents();
}

function bindEvents() {
	createListThenRenderRows();
	$noticedPersonDropdown.on('click', '.option-item', setFocusNameBlock);
}

function createListThenRenderRows() {
	api.getUserList()
		.done(initialView)
		.fail(function(err) { console.log('noticedPersonDropdown GET user list error:', err) });
}

function initialView(data) {
	peopleList  = data;
	firstPerson = data[0];

	var listRows = renderDropdown({ people : peopleList });
	$noticedPersonDropdown.empty().html( listRows );

	if (isNeedDefault) {
		setFocusNameBlock(firstPerson);
	}

	if (noticedId) {
		_.forEach(data, function(value, key) {
			if (key === noticedId) {
				setSelectedName(value.name);
				return;
			}
		});
	}
}

function renderDropdown(people) {
	var menuTemp = _.template(
	 `<% _.forEach(people, function(person) {  %>
      <li><a class="option-item" data-id=<%= person.id %>>
      	<%= person.name %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(people);
}

function setFocusNameBlock(target) {
	var selectedId = target.type==='click' ? $(this).data('id') : target.id;
	var displayName = target.type==='click' ? $(this).text() : target.name;

	setNoticeedPerson(selectedId, displayName)
}

function setNoticeedPerson(id) {
	noticedId = id;
	setSelectedId(id);
}

function getId() {
	return $selectedOption.data('id');
}

function getName() {
	return $selectedOption.text();
}

function setDefault() {
	isNeedDefault = true;
	$selectedOption.text('loading...');
}

function setSelectedId(id) {
	$selectedOption.data('id', id);
}

function setSelectedName(name) {
	$selectedOption.text(name);
	$noticedPersonBlock.find('.view-mode').text(name);
}