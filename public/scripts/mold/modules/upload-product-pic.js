'use strict';

var $ = window.jQuery = require('jquery');
var file = require('../../lib/helper/file');
var rectimage = require('rectimage');

/* DOM */
var $uploadFileBlock = $('#product-pic-block');
var $uploadFileBtn   = $uploadFileBlock.find('.pic-upload-button');
var $fileInput       = $uploadFileBlock.find('.file-input');
var $imageDisplay    = $uploadFileBlock.find('.pic-img');

var imageOriginalSrc;
var imageDataUri;
var imageFile;

exports = module.exports = {
  init: initialize,
	clear: clear,
  getImageFile: getImageFile,
	getImageDataUri: getImageDataUri,
  setImageOriginalSrc: setImageOriginalSrc,
};


function initialize() {
	bindEvents();
}

function bindEvents() {
	$uploadFileBtn.on('click', openFilesWindow);
	bindFileUploadHandler();
}

function openFilesWindow() {
	$fileInput.click();
}

function bindFileUploadHandler() {
  $fileInput.on('change', function(event) {
    imageFile = event.target.files[0];
    readFile(imageFile);
  });
}

function readFile(targetFile) {
  var reader = new FileReader();

  reader.onload = function() {

    var fileName = targetFile.name;
    var isFileTypeOk = file.is([ 'jpg', 'jpeg', 'gif', 'png' ], fileName);

    if ( ! isFileTypeOk) {
      console.error('File Type Error! \t File Name: ' + fileName);
      return false;
    }

    var image = new Image();

    image.src = reader.result;

    image.onload = function() {

      var rectimageOpt = {
        newLength: 150,
        canvas: true
      }

      imageDataUri = canvasToBase64(rectimage(image, rectimageOpt));

      $imageDisplay.attr('src', imageDataUri);
    };
  };

  reader.readAsDataURL(targetFile);
}

function canvasToBase64(canvas) {
  return canvas.toDataURL();
}

function clear() {
  imageDataUri = undefined;
  $imageDisplay.attr('src', imageOriginalSrc);
  $fileInput.val('');
}

function getImageDataUri() {
	return imageDataUri;
}

function getImageFile() {
  return imageFile;
}

function setImageOriginalSrc(src) {
  imageOriginalSrc = src;
  $imageDisplay.attr('src', src);
}