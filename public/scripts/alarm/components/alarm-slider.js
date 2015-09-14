'use strict';

var $ = window.jQuery = require('jquery');
require('jquery-ui');

exports = module.exports = {};

exports.init = function(id, value) {
	var $el = $('#slider-seekbar-' + id);
    var $plusBtn = $el.next('button');
    var $minusBtn = $el.prev('button');
    var sliderOpt = {
        animate: true,
        min: 0,
        max: 100,
        step: 10,
        value: value || 80,
        change: changeValue
    }

	$el.slider(sliderOpt);
    $plusBtn.on('click', function(){ changeValueByBtn(id, 'plus') });
    $minusBtn.on('click', function(){ changeValueByBtn(id, 'minus') });
    updateValueLabel(id, value);
}

function changeValue(event, ui) {
	var id = ui.handle.parentElement.attributes['slider-id'].value;

    updateValueLabel(id, ui.value);
}

function changeValueByBtn(id, method) {
    var $el = $('#slider-seekbar-' + id);
    var isPlus = method === 'plus';
    var value = $el.slider( "value" );

    if( isPlus && value < 100){
        value += 10;
    }else if( !isPlus && value > 0){
        value  -= 10 ;
    }

    $el.slider( "value", value);
    updateValueLabel(id, value);
}

function updateValueLabel(id, value) {
    var $percentageText = $('#alarm-percentage-' + id);
    $percentageText.data('value', value).text(value + '%');
}
