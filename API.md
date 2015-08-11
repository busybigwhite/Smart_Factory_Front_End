### __Auth & User__

```
GET     host/           首頁
GET     host/login      登入
GET     host/logout     登出
```

### __實時資訊__

```
GET     host/realtime/:auth?page=1                             第一頁清單
GET     host/realtime/:auth?page=1&factory=001                  列出 001 工廠相關的info清單
GET     host/realtime/:auth?page=1&factory=001&type=work&id=s00032     搜尋001工廠中工單編號 s0032 相關的info清單
GET     host/realtime/livepic:auth?machine=M150001&type=error   搜尋 M150001 機台的異常圖像
```

### __射出機台管理__

```
GET     host/machine/:auth?page=1                   第一頁清單
GET     host/machine/info/:auth?id=M150001          搜尋機台 M150001 詳細資訊
PUT     host/machine/edit/:auth?id=M150001          編輯機台 M150001 詳細資訊
POST    host/machine/new/:auth                      新增機台
DELETE  host/machine/:auth?id=M150001               刪除機台編號 M150001

GET     host/machine/maintenance/main/:auth?id=M150001          大保養清單(TBD)
PUT     host/machine/maintenance/main/edit/:auth?id=M150001     編輯大保養清單(TBD)
POST    host/machine/maintenance/main/new/:auth?id=M150001      新增大保養清單(TBD)
DELETE  host/machine/maintenance/main/:auth?id=M150001          刪除大保養清單(TBD)

GET     host/machine/maintenance/minor/:auth?id=M150001        小保養清單(TBD)
PUT     host/machine/maintenance/minor/edit/:auth?id=M150001   編輯小保養清單(TBD)
POST    host/machine/maintenance/minor/new/:auth?id=M150001    新增小保養清單(TBD)
DELETE  host/machine/maintenance/minor/:auth?id=M150001        刪除小保養清單(TBD)

GET     host/machine/record/:auth?id=M150001         異常維修紀錄清單(TBD)
PUT     host/machine/record/edit/:auth?id=M150001    編輯異常維修紀錄清單(TBD)
POST    host/machine/record/new/:auth?id=M150001     新增異常維修紀錄清單(TBD)
DELETE  host/machine/record/:auth?id=M150001         刪除異常維修紀錄清單(TBD)
```

### __模具管理__

```
GET     host/mold/:auth?page=1                第一頁清單
GET     host/mold/info/:auth?id=1234          搜尋模具 1234 詳細資訊
PUT     host/mold/edit/:auth?id=1234          編輯模具 1234 詳細資訊
POST    host/mold/new/:auth                   新增模具

POST    host/mold/info/image/:auth?id=1234    編輯模具 1234 圖檔 (TBD)

GET     host/mold/maintenance/main/:auth?id=1234          保養清單(TBD)
PUT     host/mold/maintenance/main/edit/:auth?id=1234     編輯保養清單(TBD)
POST    host/mold/maintenance/main/new/:auth?id=1234      新增保養清單(TBD)
DELETE  host/mold/maintenance/main/:auth?id=1234          刪除保養清單(TBD)
```

### __工單管理__

```
GET     host/workorder/:auth?page=1            第一頁清單
GET     host/workorder/info/:auth?id=s0032     搜尋工單編號 s0032 相關info
PUT     host/workorder/edit/:auth?id=s0032     編輯工單編號 s0032 相關info
POST    host/workorder/new/:auth               新增工單
DELETE  host/workorder/:auth?id=s0032          刪除工單編號 s0032
```

### __異常管理__

```
GET     host/unusual/:auth     全部清單
```

### __使用者帳號管理__

```
GET     host/member/:auth     全部清單
```

### __歷史資料分析__

```
GET     host/history/:auth                              全部清單
GET     host/history/:auth?type=work&id=s00032          列出工單 s00032 相關的info及區段統計圖
GET     host/history/:auth?type=machine&id=M150001      列出機台 M150001 相關的info及稼動率
GET     host/history/:auth?type=mold&id=1234            列出模具 1234 相關的info及熱力圖
GET     host/history/:auth?type=date&start=20150801&end=20150808
        列出 2015/08/01 至 2015/08/08 區間內所有相關的info
```

### __帳戶管理__

```
GET     host/user/:auth     帳戶資料
```