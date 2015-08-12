var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();

app.use(express.static('public'));
app.use('/includes', express.static('/public/views/includes'));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');
app.engine('html', hbs.__express);

app.get('/', function(req, res) { res.render('index') });
app.get('/login', function(req, res) { res.render('pages/login/main'); });
app.get('/realtime', function(req, res) { res.render('pages/realtime/main'); });
app.get('/machine', function(req, res) { res.render('pages/machine/main'); });
app.get('/machine/new', function(req, res) { res.render('pages/machine/new'); });
app.get('/machine/info', function(req, res) { res.render('pages/machine/info'); });
app.get('/workorder', function(req, res) { res.render('pages/workorder/main'); });
app.get('/mold', function(req, res) { res.render('pages/mold/main'); });
app.get('/unusual', function(req, res) { res.render('pages/unusual/main'); });
app.get('/member', function(req, res) { res.render('pages/member/main'); });
app.get('/history', function(req, res) { res.render('pages/history/main'); });

app.listen(app.get('port'));