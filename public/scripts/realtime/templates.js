'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
        <div class="table-col"><%= info.id %></div>
      	<div class="table-col"><%= info.machine_id %></div>
      	<div class="table-col"><%= info.mold_id %></div>
      	<div class="table-col"><%= info.customer_id %></div>
      	<div class="table-col-sm"><%= info.target_num %></div>
      	<div class="table-col"><%= info.start_date %></div>
      	<div class="table-col-sm"><%= info.current_fail_num %>/<%= info.current_num %></div>
      	<div class="table-col-sm"><%= info.abnormal_num %></div>
      	<div class="table-col-lg">
      		<input class="realtime-showpic-btn" value="即時" type="button" data-type="current" data-info=<%= info.id %>/<%= info.machine_id %><%= info.mold_id %> />
        	<input class="realtime-showpic-btn" value="安全" type="button" data-type="noremal" data-info=<%= info.id %>/<%= info.machine_id %>/<%= info.mold_id %> />
        	<input class="realtime-showpic-btn" value="異常" type="button" data-type="error" data-info=<%= info.id %>/<%= info.machine_id %>/<%= info.mold_id %> />
      	</div>
		  </li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}

exports.renderPicList = function(pictures) {

  var menuTemp = _.template(
   `<% _.forEach(pictures, function(picture, key) {  %>
      <div class="realtime-pic-item">
        <a class="thumbnail" title= <%= picture.current_time %> >
          <img src= ../pic/ipc/<%= picture.ipc_id %>/<%= picture.type %>/<%= picture.url %> >
        </a>
        <div class="realtime-pic-label">
          <span><%= picture.current_time %></span>
        </div>
      </div>

    <% });                                          %>`
  );

  return menuTemp(pictures);
}