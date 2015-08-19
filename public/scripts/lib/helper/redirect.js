'use strict';

var qs = require('qs');
var urlConfig = require('../../config/url');

module.exports = function(where, queries) {
  var url = urlConfig[`${where}Url`];
  if ( ! url) {
    throw new Error('Undefined Url');
  }
  if (queries) {
    url = url + '?' + qs.stringify(queries);
  }
  window.location.href = url;
}

