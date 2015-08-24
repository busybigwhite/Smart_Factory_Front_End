'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderFilterDropdown = function(filters) {

  var menuTemp = _.template(
	 `<% _.forEach(filters, function(filter) {  %>
      <li><a class="option-item" data-id=<%= filter.id %>>
      <% if(filter['name'] !== undefined){  %>
        <%= _.trunc( filter.name, 18) %>
      <% }else {  %>
        <%= _.trunc( filter.id, 18) %>
      <% }            %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(filters);
}

exports.renderTableList = function(infos) {

  var listTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
      	<div class="table-col"><%= info.work_order.serial_num %></div>
        <div class="table-col"><%= info.machine_serial_num %></div>
        <div class="table-col"><%= info.mold_serial_num %></div>
        <div class="table-col"><%= info.customer_name %></div>
        <div class="table-col"><%= info.work_st %></div>
        <div class="table-col"><%= info.work_et %></div>
        <div class="table-col-sm"><%= info.sample_num %></div>
        <div class="table-col-sm"><%= info.error_num %></div>
        <div class="table-col-sm">25%</div>
		  </li>
    <% });                                          %>`
	);

  return listTemp(infos);
}

exports.renderHeatmap = function(heatmapUrls) {

  var imgTemp = _.template(
   `<% _.forEach(heatmapUrls, function(heatmapUrl) {  %>
      <img src=api/pic/heatmap/<%= heatmapUrl %>>
    <% });                                          %>`
  );

  return imgTemp(heatmapUrls);

}

exports.renderChart = function() {

  var imgTemp = _.template(
      "<img src='../../../images/sample/chart.png'>"
  );

  return imgTemp();
}
