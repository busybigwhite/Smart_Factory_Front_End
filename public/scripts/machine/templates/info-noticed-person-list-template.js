'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">`+
          // TODO
      `</li>
    <% }); %>`
	);

  return menuTemp(infos);
}