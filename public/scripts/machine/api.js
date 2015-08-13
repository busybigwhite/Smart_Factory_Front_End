'use strict';

var config = require('../config/url');

exports = module.exports = {};

exports.getMachineInfo = function(id) {
	return getData(config.machineUrl + 'api/machine/' + id);
};

function getData(url) {
	$.get(url)
	.done(function(res){
		console.log(res);
		return res;
	});
}