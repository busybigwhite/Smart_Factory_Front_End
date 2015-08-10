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

app.listen(app.get('port'));