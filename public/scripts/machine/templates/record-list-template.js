'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(records) {

  var menuTemp = _.template(
	 `<% _.forEach(records, function(record) {  %>
      <li class="record-list">
      	<div class="table-col"><%= record.date %></div>
      	<div class="table-col"><%= record.content %></div>
      	<div class="table-col">
      		<button type="button" class="record-delete-button" data-record="<%= record %>">刪除</button>
      	</div>
      </li>
    <% }); %>`
	);

  return menuTemp(records);
}

exports.renderNewOne= function(record) {

  var menuTemp = _.template(
      `<li class="record-list new">
        <div class="table-col"><%= record.date %></div>
        <div class="table-col"><%= record.content %></div>
        <div class="table-col">
          <button type="button" class="record-delete-button" data-record="<%= record %>">刪除</button>
        </div>
      </li>`
  );

  return menuTemp(record);
}