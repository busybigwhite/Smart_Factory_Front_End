'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {
      if (info.group === 'Administrator') {

      } else { %>
        <li class="table-item">
          <div class="table-col"><%= info.name %></div>
          <div class="table-col"><%= info.email %></div>
          <div class="table-col"><%= info.group %></div>`+
          `<div class="table-col text-center">
              <button class="member-edit-button" data-id="<%= info.id %>">編輯</button>
          </div>
        </li>
     <% };

     }); %>`
	);

  return menuTemp(infos);
}