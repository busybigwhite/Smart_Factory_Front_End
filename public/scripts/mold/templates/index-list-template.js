'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
          <div class="table-col">
            <img class="pic-img" src="` + infos.api.getMoldPicApiUrl() + `<%= info.mold_pic %>" alt="<%= info.mold_pic %>">
          </div>
          <div class="table-col">
            <img class="pic-img" src="` + infos.api.getMoldPicApiUrl() + `<%= info.product_pic %>" alt="<%= info.product_pic %>">
          </div>
          <div class="table-col"><%= info.serial_num %></div>
          <div class="table-col"><%= info.name %></div>
          <div class="table-col"><%= info.created_at %></div>
          <div class="table-col">
            <span class="index-list-size-length"><%= info.length %></span>
            <span class="index-list-size-width"><%= info.width %></span>
            <span class="index-list-size-height"><%= info.height %></span>
          </div>
          <div class="table-col"><%= info.weight %></div>
          <div class="table-col">
              <button class="detail-info-button" data-id="<%= info.id %>">詳細資訊</button>
          </div>
      </li>
    <% }); %>`
	);

  return menuTemp(infos);
}

