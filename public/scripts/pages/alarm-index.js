'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var config = require('../config/url');
var token = require('../config/auth').getToken();
var switchBtn = require('../alarm/components/switch-button');
var alarmSlider = require('../alarm/components/alarm-slider');
require('bootstrap/js/dropdown');

/* DOM */
var $alarmSaveBtn = $('#alarm-save-btn');
var $alarmCancelBtn = $('#alarm-cancel-btn');
var $alarmDateGroup = $('.alarm-date');
var $alarmTypeGroup = $('.alarm-type-dropdown');

var data = {};

initialize();

function initialize() {
	header.include();
	bindEvents();
	getAlarmSettingsAndInitComponents();
}

function bindEvents() {
	bindUpdateAlarmSettingsOnButton();
	bindResetAlarmSettingsOnButton();
}

function bindUpdateAlarmSettingsOnButton() {
	$alarmSaveBtn.on('click', updateAlarmSettings);
}

function bindResetAlarmSettingsOnButton() {
	$alarmCancelBtn.on('click', function(){ window.location.reload() });
}

function updateAlarmSettings() {
	var $el = $('*[data-key]');

	$el.each( function(){
		var key = $(this).data('key');
		var value = $(this).data('value');
		data[key] = value;
	})

	var opts = {
		method: 'PUT',
		url: config.APIUrl + 'alarm/list',
		headers: { 'X-CSRF-Token': token },
		data: data
	};

	$.ajax(opts).done( function(){ window.location.reload() });
}

function getAlarmSettingsAndInitComponents() {
	$.get(config.APIUrl + 'alarm/list')
	 .done( function(res){

	 	_.forEach(res, function(value, key){
	 		data[key] = value;

	 		var $el = $('*[data-key="' + key + '"]');
	 		$el.data('value', value);
	 		initComponents($el);
	 	})
	 })
}

function initComponents($el) {

	var type = $el.data('type');

	switch(type){
		case "enable":
			switchBtn.init( $el.attr('id') );
		break;
		case "date":
			$el.val( $el.data('value') );
		break;
		case "type":
			$el.find('.dropdown-focus-name').text( $el.data('value') );
		break;
		case "percentage":
			alarmSlider.init( $el.data('id'), $el.data('value') );
		break;
	}
}
