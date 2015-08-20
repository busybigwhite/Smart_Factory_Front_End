'use strict';

exports = module.exports = {};

exports.is = function(mimetype, fileName) {
  fileName = fileName.toLowerCase();
  if (Array.isArray(mimetype)) {
    for (var i = 0, len = mimetype.length; i < len; i++) {
      if (isMimeType(mimetype[i], fileName)) {
        return true;
      }
    }
  } else {
    return isMimeType(mimetype, fileName);
  }
};

function isMimeType(mimetype, fileName) {
  var mimetypeLength = mimetype.length;
  return fileName
      .indexOf('.' + mimetype.toLowerCase()) === (fileName.length - (mimetypeLength + 1));
}
