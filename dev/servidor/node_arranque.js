/* global global, __dirname */
var express = require('express'),
        app = express(),
        useragent = require('express-useragent'), 
        compression = require('compression'),
        vhost = require('vhost');

<<<<<<< HEAD
var express = require('express');
//global.$ = require('./_liv');
//$.iniciar();

var app = express();
app.get('/', function (req, res) {
  res.send('p/d/principal.html');
});
=======
global.$ = require('./_liv');
global.cfg = require('./cfg/node_cfg.json');

app.use(vhost(global.cfg.url, require('./node_servidor')));
app.disable('x-powered-by');
app.use(compression());
app.use(useragent.express());
app.listen(global.cfg.porta);
>>>>>>> 58cc90048e182d7f81da54b96f3a912897b8b62c

//http://localhost:5984/categorias/_design/geral/_view/categorias?key=1