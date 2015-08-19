'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-header">
          <div class="table-col">
            <img src="` + infos.api.moldApiUrl() + `<%= info.mold_pic %>" alt="">
          </div>
          <div class="table-col"><%= info.product_pic %></div>
          <div class="table-col"><%= info.serial_num %></div>
          <div class="table-col"><%= info.manufacturer %></div>
          <div class="table-col"><%= info.created_at %></div>
          <div class="table-col"><%= info.length %> / <%= info.width %> / <%= info.height %></div>
          <div class="table-col"><%= info.weight %></div>
          <div class="table-col">
              <button class="detail-info-button" data-id="<%= info.id %>">詳細資訊</button>
          </div>
      </li>
    <% }); %>`
	);

  return menuTemp(infos);
}

