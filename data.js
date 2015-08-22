var factories = [{'id': 'F001','name': '中山廠'},
    		 {'id': 'F002','name': '台北廠'},
    		 {'id': 'F003','name': '台南廠'}];

var liveinfos = [
    {
        "id": 2,
        "customer_id": 1,
        "order_id": "S11",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:20",
        "finish_date": "2015-08-20 10:05:20",
        "produce_type": "\u5851\u81a0",
        "current_num": 1,
        "current_fail_num": 0,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": []
      },{
        "id": 2,
        "customer_id": 1,
        "order_id": "S11",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:20",
        "finish_date": "2015-08-20 10:05:20",
        "produce_type": "\u5851\u81a0",
        "current_num": 1,
        "current_fail_num": 0,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [{
            "id": 1,
            "work_order_id": 'work2',
            "factory_id": 3,
            "machine_id": 77,
            "mold_id": 1234,
            "ipc_id": 1,
            "sample_num": 1,
            "error_num": 0,
            "work_start_time": "2015-08-20 06:10:20",
            "work_end_time": "2015-08-20 10:05:20",
            "work_pause_period": 0,
            "created_at": "2015-08-20 06:10:20",
            "updated_at": "2015-08-20 06:10:20"
        }]
      },{
        "id": 2,
        "customer_id": 1,
        "order_id": "S11",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:20",
        "finish_date": "2015-08-20 10:05:20",
        "produce_type": "\u5851\u81a0",
        "current_num": 1,
        "current_fail_num": 0,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [{
            "id": 1,
            "work_order_id": 'work2',
            "factory_id": 3,
            "machine_id": 77,
            "mold_id": 1234,
            "ipc_id": 1,
            "sample_num": 1,
            "error_num": 0,
            "work_start_time": "2015-08-20 06:10:20",
            "work_end_time": "2015-08-20 10:05:20",
            "work_pause_period": 0,
            "created_at": "2015-08-20 06:10:20",
            "updated_at": "2015-08-20 06:10:20"
        }]
      }
]

var listpics = [{
        "id": 663,
        "work_order_id": 2,
        "factory_id": 1,
        "machine_id": 1,
        "mold_id": 1,
        "ipc_id": 13,
        "camera_id": 1,
        "type": "current",
        "url": "current_img",
        "created_at": "2015-08-21 10:54:56",
        "updated_at": "2015-08-21 10:54:56"
    },
    {}]

var workorderLists = [
    {'id': 'Work01','name': 'workorder1001'},
    {'id': 'Work02','name': 'workorder1002'},
    {'id': 'Work03','name': 'workorder1003'}
]


var users = [
    {
        "id": 1,
        "name": "admin",
        "group": "Administrator",
        "email": "admin@moremote.com",
        "created_at": "2015-08-19 02:59:36",
        "updated_at": "2015-08-19 02:59:36"
    },
    {
        "id": 2,
        "name": "louk",
        "group": "Manager",
        "email": "admin@moremote.com",
        "created_at": "2015-08-19 02:59:36",
        "updated_at": "2015-08-19 02:59:36"
    },
    {
        "id": 3,
        "name": "customer",
        "group": "Customer",
        "email": "customer@moremote.com",
        "created_at": "2015-08-19 07:15:22",
        "updated_at": "2015-08-19 07:15:22"
    }
]

var workorders = [
    {
        "id": 2,
        "customer_id": 1,
        "order_id": "S11",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:20",
        "finish_date": "2015-08-20 10:05:20",
        "produce_type": "塑膠",
        "current_num": 1,
        "current_fail_num": 0,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [
            {
                "id": 1,
                "work_order_id": 2,
                "factory_id": 'F003',
                "machine_id": 2,
                "mold_id": 1,
                "ipc_id": 1,
                "sample_num": 1,
                "error_num": 0,
                "work_start_time": "2015-08-20 06:10:20",
                "work_end_time": "2015-08-20 10:05:20",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:20",
                "updated_at": "2015-08-20 06:10:20"
            }
        ]
    },
    {
        "id": 3,
        "customer_id": 1,
        "order_id": "S90",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:21",
        "finish_date": "2015-08-20 10:35:21",
        "produce_type": "塑膠",
        "current_num": 6,
        "current_fail_num": 0,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [
            {
                "id": 2,
                "work_order_id": 3,
                "factory_id": 'F001',
                "machine_id": 2,
                "mold_id": 1,
                "ipc_id": 1,
                "sample_num": 6,
                "error_num": 0,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 10:35:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            }
        ]
    },
    {
        "id": 4,
        "customer_id": 1,
        "order_id": "S86",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:21",
        "finish_date": "2015-08-20 10:10:21",
        "produce_type": "塑膠",
        "current_num": 23,
        "current_fail_num": 21,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [
            {
                "id": 3,
                "work_order_id": 4,
                "factory_id": 'F001',
                "machine_id": 3,
                "mold_id": 3,
                "ipc_id": 2,
                "sample_num": 10,
                "error_num": 9,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 07:36:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            },
            {
                "id": 4,
                "work_order_id": 4,
                "factory_id": 'F003',
                "machine_id": 1,
                "mold_id": 1,
                "ipc_id": 2,
                "sample_num": 5,
                "error_num": 10,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 08:29:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            },
            {
                "id": 5,
                "work_order_id": 4,
                "factory_id": 'F003',
                "machine_id": 3,
                "mold_id": 1,
                "ipc_id": 3,
                "sample_num": 8,
                "error_num": 2,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 10:10:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            }
        ]
    },
    {
        "id": 5,
        "customer_id": 1,
        "order_id": "S91",
        "target_num": 100,
        "order_date": "2015-08-20 06:10:20",
        "status": "non-schedule",
        "schedule_date": "2015-08-20 06:10:20",
        "start_date": "2015-08-20 06:10:21",
        "finish_date": "2015-08-20 10:16:21",
        "produce_type": "金屬",
        "current_num": 8,
        "current_fail_num": 7,
        "abnormal_num": 0,
        "content": "test",
        "created_at": "2015-08-20 06:10:20",
        "updated_at": "2015-08-20 06:10:21",
        "work_order_records": [
            {
                "id": 6,
                "work_order_id": 5,
                "factory_id": 'F002',
                "machine_id": 3,
                "mold_id": 1,
                "ipc_id": 2,
                "sample_num": 0,
                "error_num": 6,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 08:39:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            },
            {
                "id": 7,
                "work_order_id": 5,
                "factory_id": 'F003',
                "machine_id": 1,
                "mold_id": 2,
                "ipc_id": 3,
                "sample_num": 2,
                "error_num": 0,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 10:16:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            },
            {
                "id": 8,
                "work_order_id": 5,
                "factory_id": 'F001',
                "machine_id": 2,
                "mold_id": 3,
                "ipc_id": 1,
                "sample_num": 6,
                "error_num": 1,
                "work_start_time": "2015-08-20 06:10:21",
                "work_end_time": "2015-08-20 09:50:21",
                "work_pause_period": 0,
                "created_at": "2015-08-20 06:10:21",
                "updated_at": "2015-08-20 06:10:21"
            }
        ]
    }
]



var workorder = {
    "id": 4,
    "customer_id": 1,
    "order_id": "S74",
    "target_num": 100,
    "order_date": "2015-08-19 02:59:38",
    "status": "non-schedule",
    "schedule_date": "2015-08-19 02:59:38",
    "start_date": "2015-08-19 02:59:39",
    "finish_date": "2015-08-19 05:55:39",
    "produce_type": "塑膠",
    "current_num": 35,
    "current_fail_num": 14,
    "abnormal_num": 0,
    "content": "test",
    "created_at": "2015-08-19 02:59:38",
    "updated_at": "2015-08-19 02:59:39",
    "work_order_records": [
        {
            "id": 7,
            "work_order_id": 4,
            "factory_id": "F001",
            "machine_id": 2,
            "mold_id": 1,
            "ipc_id": 1,
            "sample_num": 6,
            "error_num": 0,
            "work_start_time": "2015-08-19 02:59:39",
            "work_end_time": "2015-08-19 03:38:39",
            "work_pause_period": 0,
            "created_at": "2015-08-19 02:59:39",
            "updated_at": "2015-08-19 02:59:39"
        },
        {
            "id": 8,
            "work_order_id": 4,
            "factory_id": "F002",
            "machine_id": 2,
            "mold_id": 3,
            "ipc_id": 3,
            "sample_num": 8,
            "error_num": 2,
            "work_start_time": "2015-08-19 02:59:39",
            "work_end_time": "2015-08-19 05:03:39",
            "work_pause_period": 0,
            "created_at": "2015-08-19 02:59:39",
            "updated_at": "2015-08-19 02:59:39"
        },
        {
            "id": 11,
            "work_order_id": 4,
            "factory_id": "F003",
            "machine_id": 2,
            "mold_id": 1,
            "ipc_id": 1,
            "sample_num": 8,
            "error_num": 2,
            "work_start_time": "2015-08-19 02:59:39",
            "work_end_time": "2015-08-19 04:23:39",
            "work_pause_period": 0,
            "created_at": "2015-08-19 02:59:39",
            "updated_at": "2015-08-19 02:59:39"
        }
    ]
}

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
            'work_order_id': '1',
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
            'work_order_id': '2',
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
            'work_order_id': '1',
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
            'work_order_id': '2',
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
            'work_order_id': '1',
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
            'work_order_id': '2',
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

      historyInfos: historyInfos,
      workorderInfo: workorderInfo,
      users: users,
      workorders: workorders,
      workorder: workorder
};