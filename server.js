var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();
var data = require('./data');

app.use(express.static('public'));
app.use('/includes', express.static('/public/views/includes'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');
app.engine('html', hbs.__express);

app.get('/', function(req, res) { res.render('index') });
app.get('/login', function(req, res) { res.render('pages/login/main'); });


// realtime
app.get('/realtime', function(req, res) { res.render('pages/realtime/main'); });
app.get('/realtime/listpic', function(req, res) { res.render('pages/realtime/listpic') });


//machine
app.get('/machine', function(req, res) { res.render('pages/machine/main'); });
app.get('/machine/info', function(req, res) { res.render('pages/machine/info'); });
app.get('/api/machine/check_unique', function(req, res) {
	res.send('Fail');
});


//mold
app.get('/mold', function(req, res) { res.render('pages/mold/main'); });
app.get('/mold/info', function(req, res) { res.render('pages/mold/info'); });
app.get('/api/mold/list', function(req, res) {
	res.send(data.moldList);
});
app.get('/api/mold/1', function(req, res) {
	res.send(data.moldInfos);
});
app.get('/api/mold/check_unique', function(req, res) {
	res.send('Fail');
});


//workorder
app.get('/workorder', function(req, res) { res.render('pages/workorder/main'); });
app.get('/workorder/info', function(req, res) { res.render('pages/workorder/info'); });
app.get('/workorder/new', function(req, res) { res.render('pages/workorder/new'); });
app.get('/api/workorder/list', function(req, res) {
	res.send(data.liveinfos);
});
app.get('/api/workorder/info', function(req, res) {
	res.send(data.workorderInfo);
});
app.post('/api/workorder/listpic', function(req, res) {
	res.send(data.listpics);
});
app.get('/api/workorder', function(req, res) {
	res.send(data.workorders);
});
app.get('/api/workorder/1', function(req, res) {
	res.send(data.workorder);
});
app.get('/api/workorder/check_unique', function(req, res) {
	res.send('Fail');
});
app.get('/api/workorder/check_unique', function(req, res) {
	res.send('Fail');
});

//alarm
app.get('/alarm', function(req, res) { res.render('pages/alarm/main'); });
app.get('/api/alarm/list', function(req, res) {
	res.send(data.alarms);
});
app.post('/api/alarm', function(req, res) { res.sendStatus(200) });

app.get('/api/user', function(req, res) {
	res.send(data.users);
});


//member
app.get('/member', function(req, res) { res.render('pages/member/main'); });
app.get('/member/manage', function(req, res) { res.render('pages/member/manage'); });


// history
app.get('/history', function(req, res) { res.render('pages/history/main') });
app.get('/api/history/filter', function(req, res) {
	res.send(data.filters);
});
app.get('/api/history/list', function(req, res) {
	res.send(data.historyInfos);
});
app.get('/api/pic/heatmap/list/1', function(req, res) {
	res.send(data.heatmapUrl);
});


//compare
app.get('/compare', function(req, res) { res.render('pages/compare/main') });
app.get('/api/compare/list', function(req, res) {
	res.send(data.workorder);
});

//public
app.get('/api/factory/list', function(req, res) {
	res.send(data.factories);
});

app.get('/api/token', function(req, res) {
	res.send('tempToken');
});

app.get('/user', function(req, res) { res.render('pages/user/main'); });

app.listen(app.get('port'));