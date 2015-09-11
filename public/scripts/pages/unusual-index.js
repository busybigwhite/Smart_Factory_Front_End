'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var switchBtn = require('../unusual/components/switch-button');
var alertSlider = require('../unusual/components/alert-slider');
require('bootstrap/js/dropdown');
/* DOM */


initialize();

function initialize() {
	header.include();
	switchBtn.set('machine');
	switchBtn.set('mold');
	alertSlider.init('mold')
}
