'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderFactoryDropdown = function(factories) {

  var menuTemp = _.template(
	 `<% _.forEach(factories, function(factory) {  %>
      <li><a class="realtime-factory-item" data-id=<%= factory.id %>>
      		<%= factory.name %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(factories);
}

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
        <div class="table-col"><%= info.workorder_id %></div>
      	<div class="table-col"><%= info.machine_id %></div>
      	<div class="table-col"><%= info.mold_id %></div>
      	<div class="table-col"><%= info.customer_id %></div>
      	<div class="table-col-sm"><%= info.target_num %></div>
      	<div class="table-col-sm"><%= info.start_date %></div>
      	<div class="table-col-sm"><%= info.current_fail_num %>/<%= info.current_num %></div>
      	<div class="table-col-sm"><%= info.abnormal_num %></div>
      	<div class="table-col">
      		<button class="realtime-showpic-btn" data-type="current" data-info=<%= info.workorder_id %>/<%= info.machine_id %>/<%= info.mold_id %>>即時</button>
        	<button class="realtime-showpic-btn" data-type="safety" data-info=<%= info.workorder_id %>/<%= info.machine_id %>/<%= info.mold_id %>>安全</button>
        	<button class="realtime-showpic-btn" data-type="error" data-info=<%= info.workorder_id %>/<%= info.machine_id %>/<%= info.mold_id %>>異常</button>
      	</div>
		  </li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}

exports.renderPicList = function(pictures) {

  var menuTemp = _.template(
   `<% _.forEach(pictures, function(picture) {  %>
      <div class="realtime-pic-item">
        <a class="thumbnail" title= <%= picture.date %> >
          <img src= <%= picture.url %> >
        </a>
        <div class="realtime-pic-label">
          <span><%= picture.date %></span>
        </div>
      </div>

    <% });                                          %>`
  );

  return menuTemp(pictures);
}