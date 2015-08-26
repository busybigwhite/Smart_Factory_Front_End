'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var header = require('../includes/header');
var api = require('../mold/api');
var queryParameter = require('../lib/helper/query-parameter');
require('eonasdan-bootstrap-datetimepicker');

var noticeedPersonDropdown = require('../mold/modules/noticed-person-dropdown');
var maintainPeriodDropdown = require('../mold/modules/maintain-period-dropdown');
var maintainRecordTable = require('../mold/modules/maintain-record-table');

var moldPicUploadBlock = require('../mold/modules/upload-mold-pic');
var productPicUploadBlock = require('../mold/modules/upload-product-pic');


/* DOM */
var $editBtn   = $('#mold-edit-button');
var $cancelBtn = $('#mold-cancel-button');
var $saveBtn   = $('#mold-save-button');
var $deleteBtn = $('#mold-delete-button');
var $backBtn   = $('#mold-back-button');
var $moldDetailPage  = $('#mold-detail-page');
var $viewModeCollection = $moldDetailPage.find('.view-mode');
var $editModeCollection = $moldDetailPage.find('.edit-mode');

var $serialNumber  = $('#mold-serial-num');
var $name          = $('#mold-name');
var $createdAt     = $('#mold-created-at');
var $weight        = $('#mold-weight');
var $moldType      = $('#mold-type');
var $manufacturer  = $('#mold-manufacturer');
var $lifetime      = $('#mold-lifetime');
var $currentUsage  = $('#mold-current-usage');

var $noticeedPersonName = $('#mold-noticed-person').find('.view-mode');
var noticedId;
var userList;

var $length = $('#mold-size').find('.length');
var $width  = $('#mold-size').find('.width');
var $height = $('#mold-size').find('.height');

var $moldPicsBlock = $('#mold-pics-block');
var $datePicker = $('#mold-create-at-date-picker');

var today = new Date();
var dateTimePickerOpt = {
		widgetPositioning: {
			horizontal: 'auto',
			vertical: 'bottom'
		},
		maxDate: today,
		ignoreReadonly: true,
		sideBySide: true,
	};

var isEditMode   = false;
var isCreateMode = false;
var moldId;
var originalData;
var hasSaveChangedData  = false;
var hasSaveNewRecord    = false;
var hasSaveDeleteRecord = false;
var hasSaveNewData      = false;


initialize();

function initialize() {
	header.include();
	if (queryParameter.get('new') === 'true') {
		isCreateMode = true;
		showCreateMode();
	}
	moldId = queryParameter.get('ID');
	api.setFactoryId(queryParameter.get('factoryId'));
	getInitialData();
	bindEvents();

	moldPicUploadBlock.init();
	productPicUploadBlock.init();
	noticeedPersonDropdown.init();
	maintainRecordTable.init();
}

function getInitialData() {
	if (!moldId) {
		initializeDatetimePicker();
		return;
	}

	$.when( api.getMoldInfo(moldId), api.getUserList())
	 .done(function(result1, result2) {
	 		initialView(result1[0]);
	 		initialNoticedName(result2[0]);
	 })
	 .fail(function(jqXHR, textStatus, errorThrown) {
	 		console.log('machine info page get data error: ', jqXHR, textStatus, errorThrown );
	 });
}

function bindEvents() {
	$editBtn  .on('click', showEditMode);
	$cancelBtn.on('click', hideEditMode);
	$deleteBtn.on('click', deleteMold);
	$backBtn  .on('click', api.goToMoldIndex);
	$moldDetailPage.on('keypress', 'input', preventSubmitOnInputEnter);
	$moldDetailPage.submit(saveData);
}

function showEditMode() {
	isEditMode = true;
	$editBtn  .hide();
	$cancelBtn.show();
	$saveBtn  .show();
	$deleteBtn.hide();
	$backBtn  .hide();
	$viewModeCollection.addClass('editting');
	$editModeCollection.addClass('editting');
	$moldPicsBlock.addClass('editting');
	maintainRecordTable.setEditMode(true);
}

function hideEditMode() {
	isEditMode = false;
	resetViewData();
	$editBtn  .show();
	$cancelBtn.hide();
	$saveBtn  .hide();
	$deleteBtn.show();
	$backBtn  .show();
	$viewModeCollection.removeClass('editting');
	$editModeCollection.removeClass('editting');
	$moldPicsBlock.removeClass('editting');
	maintainRecordTable.setEditMode(false);
	moldPicUploadBlock.clear();
	productPicUploadBlock.clear();
}

function showCreateMode() {
	$editBtn  .hide();
	$cancelBtn.hide();
	$saveBtn  .show();
	$deleteBtn.hide();
	$backBtn  .show();
	$viewModeCollection.addClass('creating');
	$editModeCollection.addClass('creating');
	$moldPicsBlock.addClass('creating');
	maintainRecordTable.setEditMode(false);
	maintainPeriodDropdown.setDefault();
	noticeedPersonDropdown.setDefault();
}

function preventSubmitOnInputEnter(e) {
	var code = e.keyCode || e.which;
	if (code === 13) {
	  e.preventDefault();
	  return false;
	}
}

function saveData(e) {

	e.preventDefault();

	if (isEditMode && !isCreateMode) {

		$.when( saveChangedData(), saveNewRecord(), saveDeleteRecord() )
		 .done(function(result1, result2, result3) {
				api.goToMoldIndex();
			})
		 .fail(function(jqXHR, textStatus, errorThrown) {
		 		console.log('mold info page save data error: ', jqXHR, textStatus, errorThrown );
		 });

	} else if (!isEditMode && isCreateMode) {

		$.when( saveNewData(), saveNewRecord() )
		 .done(function(result1, result2) {
				api.goToMoldIndex();
			})
		 .fail(function(jqXHR, textStatus, errorThrown) {
		 		console.log('mold info page save data error: ', jqXHR, textStatus, errorThrown );
		 });

	} else {
		console.log('mold info page has error: Undefined Mode');
	}
	return false;
}

function saveChangedData() {
	var data = getInfoValue();
	return api.editMoldInfo(moldId, data);
}

function saveNewData() {
	var data = getInfoValue();
	return api.createMold(data);
}

function saveNewRecord() {

	var newRecords = getNewRecordList();
	if (newRecords && newRecords.length !== 0) {
		return api.createMoldRecord(moldId, newRecords);

	} else {
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}
}

function saveDeleteRecord() {
	var deleteRecords = getDeleteRecordList();
	if (deleteRecords && deleteRecords.length !== 0) {
		return api.deleteMoldRecord(moldId, deleteRecords);

	} else {
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}
}

function deleteMold() {
	api.deleteMold(moldId)
		 .done(function(data) {
				api.goToMoldIndex();
			})
		 .fail(function(err) { console.log("DELETE Mold error: ", err); });
}

function initialView(data) {
	originalData = data;
	initBaseInfo(data);
	initResumeInfo(data);
	initPics(data);
	initializeDatetimePicker(data);
}

function initializeDatetimePicker(data) {
	var defaultDate = data && data['created_at'] ? data['created_at'] : today;
	$datePicker.datetimepicker(dateTimePickerOpt);
	$datePicker.data("DateTimePicker").defaultDate(defaultDate);
}

function resetViewData() {
	initBaseInfo(originalData);
	initResumeInfo(originalData);
}

function initBaseInfo(data) {
	$serialNumber.find('.view-mode').text(data['serial_num']);
	$serialNumber.find('.edit-mode').val(data['serial_num']);

	$name.find('.view-mode').text(data['name']);
	$name.find('.edit-mode').val(data['name']);

	$createdAt.find('.view-mode').text(data['created_at']);

	$length.filter('.view-mode').text(data['length']);
	$length.filter('.edit-mode').val(data['length']);

	$width.filter('.view-mode').text(data['width']);
	$width.filter('.edit-mode').val(data['width']);

	$height.filter('.view-mode').text(data['height']);
	$height.filter('.edit-mode').val(data['height']);

	$weight.find('.view-mode').text(data['weight']);
	$weight.find('.edit-mode').val(data['weight']);

	$moldType.find('.view-mode').text(data['type']);
	$moldType.find('.edit-mode').val(data['type']);
}

function initResumeInfo(data) {
	noticedId = data['admin_id'];
	setNoticedId(noticedId);
	noticeedPersonDropdown.setNoticeedPerson(noticedId);

	maintainPeriodDropdown.init(data['maintain_period_value'], data['maintain_period_unit']);

	console.log("data['maintain_records'] : ", data['maintain_records']);
	maintainRecordTable.initialView(data['maintain_records']);

	$manufacturer.find('.view-mode').text(data['manufacturer']);
	$manufacturer.find('.edit-mode').val(data['manufacturer']);

	$lifetime.find('.view-mode').text(data['lifetime']);
	$lifetime.find('.edit-mode').val(data['lifetime']);

	$currentUsage.find('.view-mode').text(data['current_usage']);
	$currentUsage.find('.edit-mode').text(data['current_usage']);
}

function initialNoticedName(data) {
	if (noticedId) {
		_.forEach(data, function(value, key) {
			if (value.id === noticedId) {
				setUserName(value.name);
				return;
			}
		});
	} else {
		userList = data;
	}
}

function setNoticedId(id) {
	_.forEach(userList, function(value, key) {
		if (value.id === id) {
			setUserName(value.name);
			return;
		}
	});
}

function setUserName(name) {
	$noticeedPersonName.text(name);
}


function initPics(data) {
	var picApiUrl  = api.getMoldPicApiUrl();
	var picMold    = data['mold_pic']    ? picApiUrl + data['mold_pic'] : '' ;
	var picProduct = data['product_pic'] ? picApiUrl + data['product_pic'] : '' ;
	moldPicUploadBlock.setImageOriginalSrc(picMold);
	productPicUploadBlock.setImageOriginalSrc(picProduct);
}

function getInfoValue() {
	var data = {};
	$editModeCollection.each(function(index, el) {
		var name  = $(el).attr('name');
		var value = $(el).val();

		if (name) {
			value = value ? value : '';
			data[name] = value;
		}
	});
	data['admin_id']  = noticeedPersonDropdown.getId();
	data['created_at'] = $datePicker.val();

	data['maintain_period_value'] = maintainPeriodDropdown.getValue();
	data['maintain_period_unit']  = maintainPeriodDropdown.getType();

	var moldPic = moldPicUploadBlock.getImageFile();
	if (moldPic) data['mold_pic'] = moldPic;

	var productPic = productPicUploadBlock.getImageFile();
	if (productPic) data['product_pic'] = productPic;

	return data;
}

function getNewRecordList() {
	var maintain = addMoldIdIntoData(maintainRecordTable.getNewList());
	var data;
	if (maintain.length) {
		data = [].concat(maintain);
	}
	return data;
}

function getDeleteRecordList() {
	var maintain = addMoldIdIntoData(maintainRecordTable.getDeleteList());
	var data;
	if (maintain.length) {
		data = [].concat(maintain);
	}
	return data;
}

function addMoldIdIntoData(array) {
	return array.map(function(el, i) {
		el.mold_id = moldId;
		return el;
	});
}
