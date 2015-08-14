'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');

exports = module.exports = {
	goToMachineIndex: goToMachineIndex,
	getMachineInfo: getMachineInfo,
};

function goToMachineIndex() {
	window.location.href = config.machineUrl;
}

function getMachineInfo(id) {
	return getData(config.machineUrl + 'api/machine/info/' + id);
};

function getData(url) {
	return $.get(url);
}
