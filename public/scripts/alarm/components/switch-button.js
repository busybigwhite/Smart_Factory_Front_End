'use strict';

var $ = window.jQuery = require('jquery');

exports = module.exports = {};

exports.init = function(id) {
	var $el 	   	 = $('#' + id);
	var $switchBlock = $('#alarm-content-' + id);
	var $switchBar 	 = $el.find('.switch-bar');
	var $input 		 = $el.children('input');
	var enable 		 = $el.data('value');

	$el.on('click', switchBtn);

	if(enable === 'on') {
		$el.attr('class','switch-btn on');
		$switchBar.css('left', '38px');
		$switchBlock.removeClass('disappear');
		$input.attr('checked', true);
	}else {
		$el.attr('class','switch-btn off');
		$switchBar.css('left', 0);
		$switchBlock.addClass('disappear');
		$input.attr('checked', false);
	}
}

function switchBtn() {
	var $el = $(this);
	var $switchBlock = $('#alarm-content-' + $el.attr('id'));
	var $switchBar = $(this).find('.switch-bar');
	var position = Math.floor( $switchBar.position().left );
	var animate = function(left){
			$switchBar.animate({ left: left },"slow", function() {
	    		$el.on('click', switchBtn);
	      	});
		};

	$el.off('click');
	$el.children('input').trigger('click');

	if(position === 0){
		$el.attr('class','switch-btn on' )
		   .data('value', 'on');
		animate('38px');
		$switchBlock.removeClass('disappear');
	}else {
		$el.attr('class','switch-btn off')
		   .data('value', 'off');
		animate(0);
		$switchBlock.addClass('disappear');
	}
};