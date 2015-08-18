'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(records) {

  var menuTemp = _.template(
	 `<% _.forEach(records, function(record) {  %>
      <li class="record-list" data-record='{"content":     "<%= record.content %>",
                                            "created_at" : "<%= record.created_at %>",
                                            "id" :         "<%= record.id %>",
                                            "machine_id" : "<%= record.machine_id %>",
                                            "type" :       "<%= record.type %>",
                                            "updated_at" : "<%= record.updated_at %>"}'>
      	<div class="table-col"><%= record.created_at %></div>
      	<div class="table-col"><%= record.content %></div>
      	<div class="table-col">
      		<button type="button" class="record-delete-button">刪除</button>
      	</div>
      </li>
    <% }); %>`
	);

  return menuTemp(records);
}

exports.renderNewOne= function(record) {
  var menuTemp = _.template(
<<<<<<< HEAD
      `<li class="record-list new" data-record='{"content":    "<%= record.content %>",
                                                "created_at" : "<%= record.created_at %>",
                                                "id" :         "<%= record.id %>",
                                                "machine_id" : "<%= record.machine_id %>",
                                                "type" :       "<%= record.type %>",
                                                "updated_at" : "<%= record.updated_at %>"}'>
=======
      `<li class="record-list new">
>>>>>>> ccbb3a6b9e0b05d547532276293326817e82f743
        <div class="table-col"><%= record.created_at %></div>
        <div class="table-col"><%= record.content %></div>
        <div class="table-col">
          <button type="button" class="record-delete-button">刪除</button>
        </div>
      </li>`
  );

  return menuTemp(record);
}