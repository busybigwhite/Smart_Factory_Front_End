'use strict';

var qs = require('qs');
var assign = require('object-assign');

exports = module.exports = {};

exports.all = function() {
  return getQueries();
};

exports.get = function(key) {
  var queries = getQueries();
  return queries[key];
};

exports.build = function(params) {
  params = params || {};
  return qs.stringify(params);
};

exports.assign = function(params, opts) {
  opts = opts || {};
  var queries = getQueries();
  var newQueries = assign({}, queries, params);
  return opts.stringify ? qs.stringify(newQueries) : newQueries;
};

function getQueries() {
  var queryString = getQueryString();
  if (queryString === '') return {};
  return qs.parse(queryString);
}

function getQueryString() {
  return window.location.search.substr(1);
}
