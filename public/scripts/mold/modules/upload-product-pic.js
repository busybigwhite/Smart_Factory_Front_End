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

exports = module.exports = {
  init: initialize,
	clear: clear,
	getInputValue: getInputValue,
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
    var targetFile = event.target.files[0];
    readFile(targetFile);
  });
}

function readFile(targetFile) {
  var reader = new FileReader();

  reader.onload = function() {

    var fileName = targetFile.name;
    console.log(fileName);
    var isFileTypeOk = file.is([ 'jpg', 'jpeg', 'gif', 'png' ], fileName);
    console.log('isFileTypeOk:', isFileTypeOk);
    if ( ! isFileTypeOk) {
      // validator.emitError(new InvalidFileFormatError());
      return false;
    }

    var image = new Image();

    image.src = reader.result;

    image.onload = function() {

      // var width = this.width;
      // console.log(width);

      // var height = this.height;
      // console.log(height);

      // var size = targetFile.size;
      // console.log(size);

      // var isWidthOk = width >= 160;
      // var isHeightOk = height >= 160;
      // console.log('isWidthOk:', isWidthOk);
      // console.log('isHeightOk:', isHeightOk);
      // if ( ! (isWidthOk || isHeightOk)) {
      //   validator.emitError(new FileWidthHeightError());
      //   return false;
      // }

      // var isFileSizeOk = (size / (1024 * 1024)) < 4;
      // console.log('isFileSizeOk:', isFileSizeOk);
      // if ( ! isFileSizeOk) {
      //   validator.emitError(new FileSizeTooLargeError());
      //   return false;
      // }

      var rectimageOpt = {
        newLength: 150,
        canvas: true
      }

      var dataUri = canvasToBase64(rectimage(image, rectimageOpt));

      imageDataUri = dataUri;

      $imageDisplay.attr('src', dataUri);
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

function getInputValue() {
	return $fileInput.val();
}

function getImageDataUri() {
	return imageDataUri;
}

function setImageOriginalSrc(src) {
  imageOriginalSrc = src;
  $imageDisplay.attr('src', src);
}