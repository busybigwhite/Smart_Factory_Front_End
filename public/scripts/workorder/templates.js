'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
        <div class="table-col-lg"><%= info.serial_num %></div>
      	<div class="table-col-lg"><%= info.order_id %></div>
      	<div class="table-col"><%= info.customer_name %></div>
        <div class="table-col"><%= info.status %></div>
        <div class="table-col"><%= info.order_date %></div>
      	<div class="table-col text-center">
      		<button class="detail-info-button workorder-showinfo-btn" data-type="info" data-info=<%= info.id %>/<%= info.factory_id %>>詳細資訊</button>
      	</div>
		  </li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}

exports.renderTableZero = function(infos) {

  var menuTemp = _.template(
   `<li class="table-item">
      <div class="table-col-full">無資料顯示</div>
    </li>`
  );

  return menuTemp(infos);
}