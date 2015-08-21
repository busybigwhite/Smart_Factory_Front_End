'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../mold/api');
var queryParameter = require('../lib/helper/query-parameter');

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
	if (!moldId) return;
	api.getMoldInfo(moldId)
		 .done(initialView)
		 .fail(function(err) { console.log("GET Mold Info error: ", err); });
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
	var data = getAllInfoData();
	console.log(data);
	if (isEditMode && !isCreateMode) {
		saveChangedData(data.info);
		saveNewRecord(data.newRecords);
		saveDeleteRecord(data.deleteRecords);
		console.log('Changed Data : ', data);

	} else if (!isEditMode && isCreateMode) {
		saveNewData(data.info);
		saveNewRecord(data.newRecords);
		console.log('New Data : ', data);

	} else {
		console.log('mold info page has error: Undefined Mode');
	}
	return false;
}

function saveChangedData(data) {
	api.editMoldInfo(moldId, data)
		 .done(function(data) { console.log("EDIT Mold Info res: ", data); })
		 .fail(function(err) { console.log("EDIT Mold Info error: ", err); });
}

function saveNewData(data) {
	api.createMold(data)
		 .done(function(data) { console.log("CREATE Mold res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold error: ", err); });
}

function saveNewRecord(data) {
	api.createMoldRecord(moldId, data)
		 .done(function(data) { console.log("CREATE Mold Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
}

function saveDeleteRecord(data) {
	api.deleteMoldRecord(moldId, data)
		 .done(function(data) { console.log("CREATE Mold Record res: ", data); })
		 .fail(function(err) { console.log("CREATE Mold Record error: ", err); });
}


function deleteMold() {
	api.deleteMold(moldId)
		 .done(function(data) { console.log("DELETE Mold res: ", data); })
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
	var defaultDate = data['created_at'] ? data['created_at'] : today;
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
	// ToFix: admin_name
	noticeedPersonDropdown.setNoticeedPerson(data['admin_id'], 'default name');
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

function initPics(data) {
	// ToFix:
	var fakeSrc = 'http://placehold.it/150x150';
	moldPicUploadBlock.setImageOriginalSrc(fakeSrc);
	productPicUploadBlock.setImageOriginalSrc(fakeSrc);
}

function getAllInfoData() {
	var data = {};
	data.info = getInfoValue();
	data.newRecords = getNewRecordList();
	data.deleteRecords = getDeleteRecordList();
	return data;
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
	var data = {};
	data.maintain = addMoldIdIntoData(maintainRecordTable.getNewList());
	return data;
}

function getDeleteRecordList() {
	var data = {};
	data.maintain = addMoldIdIntoData(maintainRecordTable.getDeleteList());
	return data;
}

function addMoldIdIntoData(array) {
	return array.map(function(el, i) {
		el.mold_id = moldId;
		return el;
	});
}
