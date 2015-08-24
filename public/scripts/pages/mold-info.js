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
	api.getMoldInfo(moldId)
		 .done(initialView)
		 .fail(function(err) { console.log("GET Mold Info error: ", err); });

	api.getUserList()
		 .done(initialNoticedName)
		 .fail(function(err) { console.log('initialNoticedName GET user list error:', err) });
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
	maintainRecordTable.setEditMode(true);
	maintainPeriodDropdown.setDefaultType();
	noticeedPersonDropdown.setDefault();
}

function preventSubmitOnInputEnter(e) {
	var code = e.keyCode || e.which;
	if (code === 13) {
	  e.preventDefault();
	  return false;
	}
}

function saveData() {
	if (isEditMode && !isCreateMode) {
		saveChangedData();
		saveNewRecord();
		saveDeleteRecord();

	} else if (!isEditMode && isCreateMode) {
		saveNewData();
		saveNewRecord();

	} else {
		console.log('mold info page has error: Undefined Mode');
	}
}

function saveChangedData() {
	hasSaveChangedData = false;
	var data = getInfoValue();
	api.editMoldInfo(moldId, data)
		 .done(function(data) {
				hasSaveChangedData = true;
				ifAllSavedThenGotoIndexPage();
			})
		 .fail(function(err) { console.log("EDIT Mold Info error: ", err); });
}

function saveNewData() {
	hasSaveNewData = false;
	var data = getInfoValue();
	api.createMold(data)
		 .done(function(data) {
				hasSaveNewData = true;
				ifAllSavedThenGotoIndexPage();
			})
		 .fail(function(err) { console.log("CREATE Mold error: ", err); });
}

function saveNewRecord() {
	hasSaveNewRecord = false;
	var newRecords = getNewRecordList();
	if (newRecords && newRecords.length !== 0) {
		api.createMoldRecord(moldId, newRecords)
			 .done(function(data) {
					hasSaveNewRecord = true;
					ifAllSavedThenGotoIndexPage();
				})
			 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
	} else {
		hasSaveNewRecord = true;
		ifAllSavedThenGotoIndexPage();
	}
}

function saveDeleteRecord() {
	hasSaveDeleteRecord = false;
	var deleteRecords = getDeleteRecordList();
	if (deleteRecords && deleteRecords.length !== 0) {
		api.deleteMoldRecord(moldId, deleteRecords)
			 .done(function(data) {
					hasSaveDeleteRecord = true;
					ifAllSavedThenGotoIndexPage();
				})
			 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
	} else {
		hasSaveDeleteRecord = true;
		ifAllSavedThenGotoIndexPage();
	}
}

function ifAllSavedThenGotoIndexPage() {
	if ( getAllSavedCondition() ) api.goToMoldIndex();
}

function getAllSavedCondition() {
	return isCreateMode ? getCreateModeCondition() : getEditModeCondition() ;
}

function getCreateModeCondition() {
	return hasSaveNewData && hasSaveNewRecord;
}

function getEditModeCondition() {
	return hasSaveChangedData && hasSaveNewRecord && hasSaveDeleteRecord;
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
			if (key === noticedId) {
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
		if (key === id) {
			setUserName(value.name);
			return;
		}
	});
}

function setUserName(name) {
	$noticeedPersonName.text(name);
}


function initPics(data) {
	// ToFix:
	var fakeSrc = 'http://placehold.it/150x150';
	moldPicUploadBlock.setImageOriginalSrc(fakeSrc);
	productPicUploadBlock.setImageOriginalSrc(fakeSrc);
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
