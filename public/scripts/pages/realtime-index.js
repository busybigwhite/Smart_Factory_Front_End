'use strict';

var $ = window.jQuery = require('jquery');
var config = require('../config/url');
var $header = $("#header");



$(function(){ $header.load(config.headerUrl)});