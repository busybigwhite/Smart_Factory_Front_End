'use strict';

var $ = window.jQuery = require('jquery');
var EventEmitter = require('wolfy87-eventemitter');

var emitter = new EventEmitter();

exports = module.exports = {};

exports.emitter = emitter;

exports.set = function(id) {
	var $el 	   	 = $('#' + id);
	var $switchBlock = $('#unusual-content-' + id);
	var $switchBar 	 = $el.find('.switch-bar');
	var value      	 = $el.find('input').prop('checked');

	$el.on('click', switchBtn);

	if(value) {
		$el.attr('class','switch-btn on');
		$switchBar.css('left', '38px');
		$switchBlock.removeClass('disappear');
	}else {
		$el.attr('class','switch-btn off');
		$switchBar.css('left', 0);
		$switchBlock.addClass('disappear');
	}
}

function switchBtn() {
	var $el = $(this);
	var $switchBlock = $('#unusual-content-' + $el.attr('id'));
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
		$el.attr('class','switch-btn on' );
		animate('38px');
		$switchBlock.removeClass('disappear');
	}else {
		$el.attr('class','switch-btn off');
		animate(0);
		$switchBlock.addClass('disappear');
	}
};