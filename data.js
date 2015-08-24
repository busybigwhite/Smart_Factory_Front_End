var factories = [{'id': 'F001','name': '中山廠'},
    		 {'id': 'F002','name': '台北廠'},
    		 {'id': 'F003','name': '台南廠'}];

var liveinfos = [
      {
            'work_order_id': 'W001',
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
            'work_order_id': 'W002',
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
                'work_order_id': '1',
                'ipc_id': 'images',
                'type': 'sample',
                'current_time': '2015/08/11 00:00:00',
                'url': 'sample.jpg',
            },
            {
                'work_order_id': '1',
                'ipc_id': 'images',
                'type': 'sample',
                'current_time': '2015/08/11 00:00:00',
                'url': 'sample.jpg',
            },
            {
                'work_order_id': '1',
                'ipc_id': 'images',
                'type': 'sample',
                'current_time': '2015/08/11 00:00:00',
                'url': 'sample.jpg'
            },
            {
                'work_order_id': '1',
                'ipc_id': 'images',
                'type': 'sample',
                'current_time': '2015/08/11 00:00:00',
                'url': 'sample.jpg',
            },
            {
                'work_order_id': '1',
                'ipc_id': 'images',
                'type': 'sample',
                'current_time': '2015/08/11 00:00:00',
                'url': 'sample.jpg'
            }
]


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
                "id": 3,
                "customer_id": 1,
                "order_id": "S57",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:38",
                "finish_date": "2015-08-19 02:59:38",
                "produce_type": "塑膠",
                "current_num": 0,
                "current_fail_num": 0,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:38"
            },
            {
                "id": 1,
                "customer_id": 1,
                "order_id": "S43",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:38",
                "finish_date": "2015-08-19 07:05:38",
                "produce_type": "金屬",
                "current_num": 18,
                "current_fail_num": 27,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:38"
            },
            {
                "id": 2,
                "customer_id": 1,
                "order_id": "S98",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 03:24:39",
                "produce_type": "金屬",
                "current_num": 8,
                "current_fail_num": 5,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
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
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 5,
                "customer_id": 1,
                "order_id": "S99",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 05:43:39",
                "produce_type": "金屬",
                "current_num": 2,
                "current_fail_num": 10,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 6,
                "customer_id": 1,
                "order_id": "S88",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 07:46:39",
                "produce_type": "塑膠",
                "current_num": 13,
                "current_fail_num": 4,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 7,
                "customer_id": 1,
                "order_id": "S74",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 05:18:39",
                "produce_type": "金屬",
                "current_num": 8,
                "current_fail_num": 21,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 8,
                "customer_id": 1,
                "order_id": "S40",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 07:10:39",
                "produce_type": "金屬",
                "current_num": 14,
                "current_fail_num": 16,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 9,
                "customer_id": 1,
                "order_id": "S59",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 07:53:39",
                "produce_type": "金屬",
                "current_num": 21,
                "current_fail_num": 28,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
            },
            {
                "id": 10,
                "customer_id": 1,
                "order_id": "S70",
                "target_num": 100,
                "order_date": "2015-08-19 02:59:38",
                "status": "non-schedule",
                "schedule_date": "2015-08-19 02:59:38",
                "start_date": "2015-08-19 02:59:39",
                "finish_date": "2015-08-19 07:31:39",
                "produce_type": "金屬",
                "current_num": 30,
                "current_fail_num": 34,
                "abnormal_num": 0,
                "content": "test",
                "created_at": "2015-08-19 02:59:38",
                "updated_at": "2015-08-19 02:59:39"
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
  'serial_num': '3',
  'customer_id': '1',
  'order_id': 'S57',
  'target_num': '100',
  'order_date': '2015-08-19 02:59:38',
  'status': 'finish',
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