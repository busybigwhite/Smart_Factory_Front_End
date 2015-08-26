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

exports.loginUrl  		= `${base}/login/`;
exports.realtimeUrl  	= `${base}/realtime/`;
exports.realtimePicUrl  = `${base}/realtime/listpic`;
exports.machineUrl 	 	= `${base}/machine/`;
exports.workorderUrl 	= `${base}/workorder/`;
exports.workorderNewUrl = `${base}/workorder/new`;
exports.workorderInfoUrl= `${base}/workorder/info`;
exports.moldUrl   	 	= `${base}/mold/`;
exports.unusualUrl 	 	= `${base}/unusual/`;
exports.memberUrl 	 	= `${base}/member/`;
exports.memberManageUrl = `${base}/member/manage/`;
exports.historyUrl   	= `${base}/history/`;
exports.headerUrl 	 	= `${base}/views/includes/header/main.html`;

exports.APIUrl  		= `${base}/api/`;
exports.imageUrl 	 	= `${base}/images/`;
