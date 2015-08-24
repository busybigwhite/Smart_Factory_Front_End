'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var auth = require('../config/auth');
var header = require('../includes/header');
var config = require('../config/url');
var templates = require('../realtime/templates');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var loadingSpin = require('../lib/component/loading-spin');

require('fancybox')($);


/* DOM */
var $livePicBlock = $('#realtime-pic-block');
var $navTitle = $('#realtime-pic-title');
var spinner;
var token = auth.getToken();

exports = module.exports = {};

initialize();

function initialize() {
    header.include();
    initializeLoadingSpinner();
    bindEvents();
    getPictureListAndRenderRow();
}

function initializeLoadingSpinner() {
    spinner = loadingSpin();
    spinner.init( $livePicBlock[0] );
    spinner.start();
}

function bindEvents() {
    bindBackToListOnButton();
    bindFancyBoxEventOnPictures();
}

function bindBackToListOnButton() {
    $livePicBlock.on('click', '.realtime-back-btn', backToList);
}

function bindFancyBoxEventOnPictures() {
    $livePicBlock.on('click', '.thumbnail', openFancyBoxManually)
}

function backToList() {
    var image_view = queryParameter.get('image_view');

    redirect('realtime', { image_view });
}

function openFancyBoxManually() {
    var url = $(this).children('img').attr('src');
    var title = $(this).attr('title');

    $.fancybox.open({
        href : url,
        title : title,
        type: 'image',
        helpers : {
            title : {type : 'float'}
        }
    });
}

function getPictureListAndRenderRow() {
    var group = [];
    var workorderId = queryParameter.get('work_order_id');
    var type = queryParameter.get('type');
    var title = queryParameter.get('title');

    $.post(config.APIUrl + 'workorder/listpic?work_order_id=' + workorderId + '&type=' + type,
        { _token: token })

     .done(function(res){
        resetBlockAndTitle(title);

        if( _.isArray(res) ){
            group = res;
        }else {
            group.push(res);
        }

        var cameraGroup = _.groupBy(group, function(n){ return n.camera_id });

        _.forEach(cameraGroup, function(objects, cameraIds) {

            if(cameraIds === "undefined") return;

            renderPictureLabels(cameraIds);
            renderPictureRows(objects);
        });
     })
     .always(function(){
        spinner.stop();
     });
}

function resetBlockAndTitle(title) {
    var titleLabel = templates.renderPicTilte({ title : title });

    $livePicBlock.empty().append( titleLabel );
}

function renderPictureLabels(cameraIds) {
    var cameraLabel = templates.renderPicCameraLabel({ cameras : cameraIds });

    $livePicBlock.append( cameraLabel );
}

function renderPictureRows(pictures) {
    var picList = templates.renderPicList({ pictures : pictures });

    $('.realtime-pic-item-block').last().append( picList );
}
