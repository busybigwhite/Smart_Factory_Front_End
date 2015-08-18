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

var workorderInfo = {
    'workorder_id':'W001','order_id':'ORDER001','customer_name':'Moremote','factories':'台中梧棲',
    'workorder_status':'finish'
};

module.exports = {
      factories: factories,
      liveinfos: liveinfos,
      listpics: listpics,
      machineLists: machineLists,
      moldLists: moldLists,
      workorderInfo: workorderInfo
};