'use strict';

var $ = window.jQuery = require('jquery');
var _ = require('lodash');
var auth = require('../config/auth');
var header = require('../includes/header');
var config = require('../config/url');
var commonConfig = require('../config/common');
var templates = require('../realtime/templates');
var queryParameter = require('../lib/helper/query-parameter');
var redirect = require('../lib/helper/redirect');
var loadingSpin = require('../lib/component/loading-spin');

require('fancybox')($);


/* DOM */
var $livePicBlock = $('#realtime-pic-block');
var $navTitle = $('#realtime-pic-title');

var spinner;
var reloadTimer;
var token = auth.getToken();

exports = module.exports = {};

initialize();

function initialize() {
    header.include();
    initializeLoadingSpinner();
    bindEvents();
    getPictureListAndRenderRow();
    setReloadTimer();
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
    var factory_id = queryParameter.get('factory_id');

    redirect('realtime', { image_view, factory_id });
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

    var data = queryParameter.all();
    data['_token'] = token;

    $.post(config.APIUrl + 'workorder/listpic', data)
     .done(function(res){
        resetBlockAndTitle(data.title);

        if( _.isEmpty(res) ){
            renderNoDataBlock(data.type);

        }else {
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
        }
     })
     .always(function(){ spinner.stop() });
}

function resetBlockAndTitle(title) {
    var titleLabel = templates.renderPicTilte({ title : title });

    $livePicBlock.empty().append( titleLabel );
}

function renderNoDataBlock(type) {
    switch(type){
        case "current":
            var text = '模內保護機未啟動或未連線';
        break;
        case "normal":
            var text = '模內保護機未建立安全樣本';
        break;
        case "error":
            var text = '模內保護機未產生異常圖像';
        break;
    }

    var noDataText = templates.renderNoDataText({ text : text });

    $livePicBlock.append( noDataText );
}

function renderPictureLabels(cameraIds) {
    var cameraLabel = templates.renderPicCameraLabel({ cameras : cameraIds });

    $livePicBlock.append( cameraLabel );
}

function renderPictureRows(pictures) {
    var picList = templates.renderPicList({ pictures : pictures });

    $('.realtime-pic-item-block').last().append( picList );
}

function setReloadTimer() {

    var type = queryParameter.get('type');

    type === 'current' &&
        setTimeout(function(){ window.location.reload() }, commonConfig.currentPicReloadTime);
}