'use strict';

/**
 * url.js
 *
 * @author  Leo ChenTsu Lin
 *
 */

exports = module.exports = {};

var hostname      = exports.hostname = location.hostname;

var port          = exports.port = location.port;

var protocol      = exports.protocol = 'http';

var portDisplay   = (port === 80) ? '' : ':' + port;

var base          = exports.baseUrl = `${protocol}://${hostname}${portDisplay}`;

// var projectName   = exports.projectName = 'backend';

// var restNamespace = exports.restNamespace = 'rest';

// exports.usersUrl     = `${base}/${projectName}/${restNamespace}/users/`;
// exports.membersUrl   = `${base}/${projectName}/${restNamespace}/members/`;
// exports.productsUrl  = `${base}/${projectName}/${restNamespace}/products/`;
// exports.devicesUrl   = `${base}/${projectName}/${restNamespace}/devices/`;
// exports.firmwaresUrl = `${base}/${projectName}/${restNamespace}/firmwares/`;
// exports.languagesUrl = `${base}/${projectName}/${restNamespace}/languages/`;
// exports.eventsUrl    = `${base}/${projectName}/${restNamespace}/events/`;
// exports.publishesUrl = `${base}/${projectName}/${restNamespace}/publishes/`;

exports.realtimeUrl  = `${base}/realtime/`;
exports.machineUrl 	 = `${base}/machine/`;
exports.workorderUrl = `${base}/workorder/`;
exports.moldUrl   	 = `${base}/mold/`;
exports.unusualUrl 	 = `${base}/unusual/`;
exports.memberUrl 	 = `${base}/member/`;
exports.historyUrl   = `${base}/history/`;
exports.headerUrl 	 = `${base}/views/includes/header/main.html`;

exports.imageUrl 	 = `${base}/images/`;
