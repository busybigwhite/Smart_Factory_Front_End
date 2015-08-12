var factories = [{'ID': 'F001','Name': '中山廠'},
    		 {'ID': 'F002','Name': '台北廠'},
    		 {'ID': 'F003','Name': '台南廠'}];

var liveinfos = [
      {
            'WorkOrder_ID': 'W001',
            'Factory_ID': 'F001',
            'Machine_ID': 'MA001',
            'Mold_ID': 'MOLD001',
            'IPC_ID': 'IPC001',
            'Customer_ID': 'CUS001',
            'Order_ID': 'ORDER001',
            'Target_Num': '1000',
            'Order_Date': '2015/08/12 00:00:00',
            'Status': 'Producing',
            'Schedule_Date': '2015/08/12 10:00:00',
            'Start_Date': '2015/08/12 10:30:00',
            'Finish_Date': '2015/08/15 10:00:00',
            'Produce_Type': '塑膠',
            'Current_Num': '500',
            'Current_Fail_Num': '2',
            'Abnormal_Num': '1',
            'Content': '測試資料1'
      },
      {
            'WorkOrder_ID': 'W002',
            'Factory_ID': 'F002',
            'Machine_ID': 'MA002',
            'Mold_ID': 'MOLD002',
            'IPC_ID': 'IPC002',
            'Customer_ID': 'CUS002',
            'Order_ID': 'ORDER002',
            'Target_Num': '2000',
            'Order_Date': '2015/08/11 00:00:00',
            'Status': 'schedule',
            'Schedule_Date': '2015/08/12 12:00:00',
            'Start_Date': '2015/08/12 12:30:00',
            'Finish_Date': '2015/08/16 14:00:00',
            'Produce_Type': '金屬',
            'Current_Num': '1500',
            'Current_Fail_Num': '74',
            'Abnormal_Num': '20',
            'Content': '測試資料2'
      }
]

module.exports = {
      factories: factories,
      liveinfos: liveinfos
};