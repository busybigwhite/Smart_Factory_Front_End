'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var config = require('../../config/url');
require('bootstrap/js/dropdown');

 /* DOM */
var $noticedPersonBlock = $('#machine-noticed-person');
var $noticedPersonDropdown = $('#machine-notice-dropdown');
var $selectedOption = $('#machine-notice-dropdown-btn').find('.selected-option');

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
	$.get(config.APIUrl + 'user/list')
	 .done(initialView)
	 .fail(function(err) { console.log('noticedPersonDropdown GET user list error:', err) });
	// setTimeout(function() {
	// 	var fakeResponse = [{"id":1,"name":"admin","group":"Administrator","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"},{"id":2,"name":"louk","group":"Manager","email":"admin@moremote.com","created_at":"2015-08-19 02:59:36","updated_at":"2015-08-19 02:59:36"}];
	// 	initialView(fakeResponse);
	// }, 3000);
}

function initialView(data) {
	peopleList  = data;
	firstPerson = data[0];

	var listRows = renderDropdown({ people : peopleList });
	$noticedPersonDropdown.empty().html( listRows );

	if (isNeedDefault) {
		setFocusNameBlock(firstPerson);
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

function setNoticeedPerson(id, name) {
	setSelectedId(id);
	setSelectedName(name);
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