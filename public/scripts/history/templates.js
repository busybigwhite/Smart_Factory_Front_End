'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderFilterDropdown = function(filters) {

  var menuTemp = _.template(
	 `<% _.forEach(filters, function(filter) {  %>
      <li><a class="option-item" data-id=<%= filter.id %>>
      <% if(filter['serial_num'] !== undefined){  %>
        <%= _.trunc( filter.serial_num, 18) %>
      <% }else {  %>
        <%= _.trunc( filter.name, 18) %>
      <% }            %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(filters);
}

exports.renderTableList = function(infos) {

  var listTemp = _.template(
	 `<% _.forEach(infos, function(info, index) {    %>
      <li class="table-item">
      	<div class="table-col"><%= info.work_order.serial_num %></div>
        <div class="table-col"><%= info.machine_serial_num %></div>
        <div class="table-col"><%= info.mold_serial_num %></div>
        <div class="table-col"><%= info.customer_name %></div>
        <div class="table-col"><%= info.work_start_time %></div>
        <div class="table-col"><%= info.work_end_time %></div>
        <div class="table-col-sm"><%= info.sample_num %></div>
        <div class="table-col-sm"><%= info.error_num %></div>
    <% if(info['availability'] !== undefined){      %>
        <div class="table-col-sm"><%= info.availability %></div>
    <% }else {                                    %>
        <div class="table-col-sm"></div>
    <% }                                          %>
		  </li>
    <% });                                          %>`
	);

  return listTemp(infos);
}

exports.renderHeatmap = function(heatmapUrls) {

  var imgTemp = _.template(
   `<% _.forEach(heatmapUrls, function(heatmapUrl) {  %>
      <div class="history-heatmap-block">
        <img src=api/pic/<%= heatmapUrl.path %>>
        <span class="history-heatmap-label">工單編號：<%= heatmapUrl.work_order_serial_num %></span>
      </div>
    <% });                                            %>`
  );

  return imgTemp(heatmapUrls);

}

exports.renderNoDataText = function() {
  var nullTemp = _.template('<span class="no-heatmap-text">heatmap未產生</span>');

  return nullTemp();
}

exports.renderChart = function() {

  var imgTemp = _.template(
      "<img src='../../../images/sample/chart.png'>"
  );

  return imgTemp();
}
