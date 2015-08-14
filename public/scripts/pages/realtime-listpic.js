'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var config = require('../config/url');
var templates = require('../realtime/templates');
var queryParameter = require('../lib/helper/query-parameter');

require('fancybox')($);


/* DOM */
var $livepicItemBlock = $('#realtime-pic-item-block');
var $navTitle = $('#realtime-pic-title');

exports = module.exports = {};

initialize();

function initialize() {
    header.include();
    bindEvents();
    getPictureListAndRenderRow();
}

function bindEvents() {
    bindFancyBoxEventOnPictures();
}

function bindFancyBoxEventOnPictures() {
    $livepicItemBlock.on('click', '.thumbnail', openFancyBoxManually)
}

function openFancyBoxManually() {
    var url = $(this).children('img').attr('src');
    var title = $(this).attr('title');

    $.fancybox.open({
        href : url,
        title : title,
        helpers : {
            title : {type : 'float'}
        }
    });
}

function getPictureListAndRenderRow() {
    var workorderId = queryParameter.get('workorder_id');
    var type = queryParameter.get('type');
    var title = queryParameter.get('title');

    // $.get(config.APIUrl + 'realtime/listpic/:' + userId + '?workorder_id=' + workorderId + '&type=' + type)
    $.get(config.APIUrl + 'realtime/listpic/?workorder_id=' + workorderId + '&type=' + type)
     .done(function(response){
        $navTitle.text(title);
        renderPictureRows(response);
     });
}

function renderPictureRows(pictures) {
    var picList = templates.renderPicList({ pictures : pictures });

    $livepicItemBlock.empty().html( picList );
}