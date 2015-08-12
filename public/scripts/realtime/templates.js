'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderFactoryDropdown = function(factories) {

  var menuTemp = _.template(
	 `<% _.forEach(factories, function(factory) {  %>
      <li><a class="realtime-factory-item" data-id=<%= factory.ID %>>
      		<%= factory.Name %>
      </a></li>
    <% });                                          %>`
	);

  return menuTemp(factories);
}

exports.renderTableList = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      	<li class="table-item">
			<div class="table-col"><%= info.WorkOrder_ID %></div>
        	<div class="table-col"><%= info.Machine_ID %></div>
        	<div class="table-col"><%= info.Mold_ID %></div>
        	<div class="table-col"><%= info.Customer_ID %></div>
        	<div class="table-col-sm"><%= info.Target_Num %></div>
        	<div class="table-col-sm"><%= info.Start_Date %></div>
        	<div class="table-col-sm"><%= info.Current_Fail_Num %>/<%= info.Current_Num %></div>
        	<div class="table-col-sm"><%= info.Current_Fail_Num %></div>
        	<div class="table-col">
        		<button class="realtime-show-live-pic-btn" data-id=<%= info.Machine_ID %>>即時</button>
            	<button class="realtime-show-sample-pic-btn" data-id=<%= info.Machine_ID %>>安全</button>
            	<button class="realtime-show-err-pic-btn" data-id=<%= info.Machine_ID %>>異常</button>
        	</div>
		</li>
    <% });                                          %>`
	);

  return menuTemp(infos);
}
