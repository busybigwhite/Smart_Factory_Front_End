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

app.get('/realtime', function(req, res) { res.render('pages/realtime/main'); });
app.get('/realtime/listfactory', function(req, res) {
	res.send(data.factories);
});
app.get('/realtime/liveinfo', function(req, res) {
	console.log(req.query.factory);
	res.send(data.liveinfos);
});

app.get('/machine', function(req, res) { res.render('pages/machine/main'); });
app.get('/workorder', function(req, res) { res.render('pages/workorder/main'); });
app.get('/mold', function(req, res) { res.render('pages/mold/main'); });
app.get('/unusual', function(req, res) { res.render('pages/unusual/main'); });
app.get('/member', function(req, res) { res.render('pages/member/main'); });
app.get('/history', function(req, res) { res.render('pages/history/main'); });

app.listen(app.get('port'));