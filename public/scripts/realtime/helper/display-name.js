'use strict';

var _ = require('lodash');

var itemInfo = {};
var display = {};
var statusList = [
	{'key': 'non-schedule','displayName': '未排程'},
 	{'key': 'schedule','displayName': '已排程'},
 	{'key': 'producing','displayName': '生產中'},
 	{'key': 'finish','displayName': '結案'},
 	{'key': 'stopping','displayName': '暫停運作'},
 	{'key': 'error','displayName': '異常'}
];

exports = module.exports = {};

exports.createDisplayData = function(data) {
	itemInfo = data;

	createDisplayName();
	mappingStatus();
	createBtnDataInfo();

	return display;
}

function createDisplayName() {
	display['machine_serial_num'] = itemInfo.machine_serial_num || '未生產';
	display['mold_serial_num'] = itemInfo.mold_serial_num || '未生產';
}

function mappingStatus() {
	var displayName = _.result( _.find(statusList, 'key', itemInfo.status), 'displayName');

	display['status'] = displayName;
}

function createBtnDataInfo(){

	var info = {
		work_order_id : itemInfo.id,
		machine_id : itemInfo.machine_id,
		mold_id : itemInfo.mold_id,
		ipc_id : itemInfo.ipc_id,
		title : itemInfo.serial_num + '/' + display.machine_serial_num + '/' + display.mold_serial_num
	}

	display['info'] = JSON.stringify(info);;
}