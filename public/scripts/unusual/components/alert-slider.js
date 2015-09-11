'use strict';

var $ = window.jQuery = require('jquery');
require('jquery-ui');

exports = module.exports = {};

exports.init = function(id) {
	var $el = $('#slider-seekbar-' + id);

	$el.slider({
        animate: true,
        min: 0,
        max: 100,
        step: 1,
        value: 80,
        change: updateValue
    });
}

function updateValue(event, ui) {
	var id = ui.handle.parentElement.id.split('-')[2];
	var $percentageText = $('#used-percentage-' + id);

	$percentageText.text(ui.value + '%');
};