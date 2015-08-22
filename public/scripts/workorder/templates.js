'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
        <div class="table-col"><%= info.id %></div>
      	<div class="table-col"><%= info.order_id %></div>
      	<div class="table-col"><%= info.customer_id %></div>
        <div class="table-col"><%= info.factory_name %></div>
      	<div class="table-col"><%= info.status %></div>
      	<div class="table-col-lg">
      		<button class="detail-info-button workorder-showinfo-btn" data-type="info" data-info=<%= info.id %>/<%= info.factory_id %>>詳細資訊</button>
      	</div>
		  </li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}