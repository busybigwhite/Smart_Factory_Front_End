'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
        <div class="table-col"><%= info.id %></div>
      	<div class="table-col">

    <% if(info.work_order_records.length){ %>
            <%= info.work_order_records[0].machine_id %>
    <% }                                   %>

        </div>
      	<div class="table-col">

    <% if(info.work_order_records.length){ %>
            <%= info.work_order_records[0].mold_id %>
    <% }                                   %>

        </div>
      	<div class="table-col"><%= info.customer_id %></div>
      	<div class="table-col-sm"><%= info.target_num %></div>
      	<div class="table-col"><%= info.start_date %></div>
      	<div class="table-col-sm"><%= info.current_fail_num %>/<%= info.current_num %></div>
      	<div class="table-col-sm"><%= info.abnormal_num %></div>
      	<div class="table-col-lg">

    <% if(info.work_order_records.length){ %>
        		<input class="realtime-showpic-btn" value="即時" type="button" data-type="current" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
          	<input class="realtime-showpic-btn" value="安全" type="button" data-type="normal" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
          	<input class="realtime-showpic-btn" value="異常" type="button" data-type="error" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
    <% }else {                              %>
              <input class="realtime-showpic-btn" value="即時" type="button" data-type="current" data-info=<%= info.id %> />
              <input class="realtime-showpic-btn" value="安全" type="button" data-type="normal" data-info=<%= info.id %> />
              <input class="realtime-showpic-btn" value="異常" type="button" data-type="error" data-info=<%= info.id %> />
    <% }                                    %>

      	</div>
		  </li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}

exports.renderPicTilte = function(title) {

  var titleTemp = _.template('<div id="realtime-pic-title"><%= title %></div>');

  return titleTemp(title);
}

exports.renderPicCameraLabel = function(cameras) {

  var labelTemp = _.template(
   `<% _.forEach(cameras, function(camera) {  %>
      <div class="realtime-pic-item-block">
        <div class="realtime-pic-cam-title">Camera：<%= camera %></div>
      </div>
    <% });                                          %>`
  );

  return labelTemp(cameras);
}

exports.renderPicList = function(pictures) {

  var picTemp = _.template(
   `<% _.forEach(pictures, function(picture, key) {  %>
      <div class="realtime-pic-item">
        <a class="thumbnail" title= <%= picture.current_time %> >
          <img src= ../api/pic/ipc/<%= picture.ipc_id %>/<%= picture.work_order_id %>/<%= picture.camera_id %>/<%= picture.type %>/<%= picture.url %> onerror="this.parentElement.style.display='none'">
        </a>
        <div class="realtime-pic-label">
          <span><%= picture.current_time %></span>
        </div>
      </div>

    <% });                                          %>`
  );

  return picTemp(pictures);
}