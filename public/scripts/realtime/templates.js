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
      	<div class="table-col-sm"><%= info.current_num %>/<%= info.current_fail_num %></div>
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

exports.renderImageList = function(infos) {

  var imgTemp = _.template(
   `<% _.forEach(infos, function(info) {  %>
      <div class="realtime-img-item">
        <div class="realtime-img-content">
          <ul class="realtime-img-title">
            <li>工單編號</li>
            <li>射出機台編號</li>
            <li>模具編號</li>
            <li>客戶名稱</li>
            <li>預計生產總數</li>
            <li>本次開始生產時間</li>
            <li>正常/異常</li>
            <li>不良品數</li>
          </ul>

          <ul class="realtime-img-value">
            <li><%= info.id %></li>

    <% if(info.work_order_records.length){ %>
            <li><%= info.work_order_records[0].machine_id %></li>
    <% }                                   %>


    <% if(info.work_order_records.length){ %>
            <li><%= info.work_order_records[0].mold_id %></li>
    <% }                                   %>

            <li><%= info.customer_id %></li>
            <li><%= info.target_num %></li>
            <li><%= info.start_date %></li>
            <li><%= info.current_num %>/<%= info.current_fail_num %></li>
            <li><%= info.abnormal_num %></li>
          </ul>
          <div class="realtime-img-button-group">
    <% if(info.work_order_records.length){ %>
            <input class="realtime-showpic-btn img-mode" value="即時圖樣" type="button" data-type="current" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
            <input class="realtime-showpic-btn img-mode" value="安全樣本" type="button" data-type="normal" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
            <input class="realtime-showpic-btn img-mode" value="異常圖樣" type="button" data-type="error" data-info=<%= info.id %>/<%= info.work_order_records[0].machine_id %>/<%= info.work_order_records[0].mold_id %> />
    <% }else {                              %>
            <input class="realtime-showpic-btn img-mode" value="即時圖樣" type="button" data-type="current" data-info=<%= info.id %> />
            <input class="realtime-showpic-btn img-mode" value="安全樣本" type="button" data-type="normal" data-info=<%= info.id %> />
            <input class="realtime-showpic-btn img-mode" value="異常圖樣" type="button" data-type="error" data-info=<%= info.id %> />
    <% }                                    %>
          </div>
        </div>
      </div>
    <% });                                          %>`
  );

  return imgTemp(infos);
}

exports.renderPicTilte = function(title) {

  var titleTemp = _.template('<div id="realtime-pic-title"><span><%= title %></span><button class="realtime-back-btn pull-right">回列表</button></div>');

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