var factories = [{'id': 'F001','name': '中山廠'},
    		 {'id': 'F002','name': '台北廠'},
    		 {'id': 'F003','name': '台南廠'}];

var liveinfos = [
      {
            'workorder_id': 'W001',
            'factory_id': 'F001',
            'machine_id': 'MA001',
            'mold_id': 'MOLD001',
            'IPC_id': 'IPC001',
            'customer_id': 'CUS001',
            'order_id': 'ORDER001',
            'target_num': '1000',
            'order_date': '2015/08/12 00:00:00',
            'status': 'Producing',
            'schedule_date': '2015/08/12 10:00:00',
            'start_date': '2015/08/12 10:30:00',
            'finish_date': '2015/08/15 10:00:00',
            'produce_type': '塑膠',
            'current_num': '500',
            'current_fail_num': '2',
            'abnormal_num': '1',
            'content': '測試資料1'
      },
      {
            'workorder_id': 'W002',
            'factory_id': 'F002',
            'machine_id': 'MA002',
            'mold_id': 'MOLD002',
            'IPC_id': 'IPC002',
            'customer_id': 'CUS002',
            'order_id': 'ORDER002',
            'target_num': '1000',
            'order_date': '2015/08/12 00:00:00',
            'status': 'Producing',
            'schedule_date': '2015/08/12 10:00:00',
            'start_date': '2015/08/12 10:30:00',
            'finish_date': '2015/08/15 10:00:00',
            'produce_type': '塑膠',
            'current_num': '500',
            'current_fail_num': '2',
            'abnormal_num': '1',
            'content': '測試資料2'
      }
]

var listpics = [
            {
                'workorder_id': '1',
                'pic_id': '1',
                'type': 'normal',
                'current_time': '2015/08/11 00:00:00',
                'url': '../../../images/sample/sample.jpg',
            },
            {
                'workorder_id': '1',
                'mold_id': '2',
                'type': 'error',
                'current_time': '2015/08/11 00:00:00',
                'url': '../../../images/sample/sample.jpg',
            },
            {
                'workorder_id': '1',
                'pic_id': '0',
                'type': 'current',
                'current_time': '2015/08/11 00:00:00',
                'url': '../../../images/sample/sample.jpg'
            },
            {
                'workorder_id': '1',
                'mold_id': '2',
                'type': 'error',
                'current_time': '2015/08/11 00:00:00',
                'url': '../../../images/sample/sample.jpg',
            },
            {
                'workorder_id': '1',
                'pic_id': '0',
                'type': 'current',
                'current_time': '2015/08/11 00:00:00',
                'url': '../../../images/sample/sample.jpg'
            }
]

var workorderLists = [
    {'id': 'Work01','name': 'workorder1001'},
    {'id': 'Work02','name': 'workorder1002'},
    {'id': 'Work03','name': 'workorder1003'}
]

var machineLists = [
    {'id': 'M001','name': 'machine001'},
    {'id': 'M002','name': 'machine002'},
    {'id': 'M003','name': 'machine003'}
]

var moldLists = [
    {'id': 'Mold001','name': 'mold00001'},
    {'id': 'Mold002','name': 'mold00002'},
    {'id': 'Mold003','name': 'mold00003'}
]


var historyInfos = [
      {
            'factory_id': '1',
            'workorder_id': '1',
            'machine_id': '1',
            'mold_id': '1',
            'customer_id': '1',
            'work_st': '2015/08/15 14:00:00',
            'work_et': '2015/08/16 14:00:00',
            'sample_num': '5000',
            'error_num': '123',
            'heatmap': '../../../images/sample/heatmap.jpg'
      },
      {
            'factory_id': '2',
            'workorder_id': '2',
            'machine_id': '2',
            'mold_id': '2',
            'customer_id': '2',
            'work_st': '2015/08/25 02:00:00',
            'work_et': '2015/08/26 03:00:00',
            'sample_num': '400',
            'error_num': '16',
            'heatmap': '../../../images/sample/heatmap.jpg'
      },
      {
            'factory_id': '1',
            'workorder_id': '1',
            'machine_id': '1',
            'mold_id': '1',
            'customer_id': '1',
            'work_st': '2015/08/15 14:00:00',
            'work_et': '2015/08/16 14:00:00',
            'sample_num': '5000',
            'error_num': '123',
            'heatmap': '../../../images/sample/heatmap.jpg'
      },
      {
            'factory_id': '2',
            'workorder_id': '2',
            'machine_id': '2',
            'mold_id': '2',
            'customer_id': '2',
            'work_st': '2015/08/25 02:00:00',
            'work_et': '2015/08/26 03:00:00',
            'sample_num': '400',
            'error_num': '16',
            'heatmap': '../../../images/sample/heatmap.jpg'
      },
      {
            'factory_id': '1',
            'workorder_id': '1',
            'machine_id': '1',
            'mold_id': '1',
            'customer_id': '1',
            'work_st': '2015/08/15 14:00:00',
            'work_et': '2015/08/16 14:00:00',
            'sample_num': '5000',
            'error_num': '123',
            'heatmap': '../../../images/sample/heatmap.jpg'
      },
      {
            'factory_id': '2',
            'workorder_id': '2',
            'machine_id': '2',
            'mold_id': '2',
            'customer_id': '2',
            'work_st': '2015/08/25 02:00:00',
            'work_et': '2015/08/26 03:00:00',
            'sample_num': '400',
            'error_num': '16',
            'heatmap': '../../../images/sample/heatmap.jpg'
      }
]

// var workorderInfo = {
//     'workorder_id':'W001','order_id':'ORDER001','customer_name':'Moremote','factories':'台中梧棲',
//     'workorder_status':'finish'
// };

var workorderInfo = {
  'id': '3',
  'customer_id': '1',
  'order_id': 'S57',
  'target_num': '100',
  'order_date': '2015-08-19 02:59:38',
  'status': 'non-schedule',
  'schedule_date': '2015-08-19 02:59:38',
  'start_date': '2015-08-19 02:59:38',
  'finish_date': '2015-08-19 02:59:38',
  'produce_type': '塑膠',
  'current_num': '0',
  'current_fail_num': '0',
  'abnormal_num': '0',
  'content': 'test',
  'created_at': '2015-08-19 02:59:38',
  'updated_at': '2015-08-19 02:59:38',
  'work_order_records': []
};


module.exports = {
      factories: factories,
      liveinfos: liveinfos,
      listpics: listpics,
      workorderLists: workorderLists,
      machineLists: machineLists,
      moldLists: moldLists,

      historyInfos: historyInfos
      workorderInfo: workorderInfo
};