'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.renderList = function(info) {

	var listTemp = _.template(
	   `<li><%= info.serial_num %></li>
		<li><%= info.order_id %></li>
		<li><%= info.customer_name %></li>
		<li><%= info.factory_name %></li>
		<li><%= info.status_show %></li>
		<li><%= info.order_date %></li>
		<li><%= info.content %></li>
		<li><%= info.schedule_date %></li>
		<li><%= info.target_num %></li>
		<li><%= info.produce_type %></li>
		<li><%= info.start_date %></li>
		<li><%= info.current_num %></li>
		<li><%= info.current_fail_num %></li>
		<li><%= info.abnormal_num %></li>
		<li><%= info.finish_date %></li>`
  	);

  return listTemp(info);
}

exports.renderNoDataText = function(isErp) {
  var nullTemp = isErp ? _.template('<span class="no-data-text">無法連線ERP資料庫</span>')
  					   : _.template('<span class="no-data-text">查無資料</span>');

  return nullTemp();
}