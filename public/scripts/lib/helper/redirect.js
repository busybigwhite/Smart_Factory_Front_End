'use strict';

var qs = require('qs');
var urlConfig = require('../../config/url');

exports = module.exports = redirect;

function redirect(where, queries) {
  var url = urlConfig[`${where}Url`];
  if ( ! url) {
    throw new Error('Undefined Url');
  }
  if (queries) {
    url = url + '?' + qs.stringify(queries);
  }
  window.location.href = url;
}
