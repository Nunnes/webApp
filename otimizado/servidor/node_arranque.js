/* global global, __dirname */
var express = require('express'),
        app = express(),
        useragent = require('express-useragent'), 
        compression = require('compression'),
        vhost = require('vhost');

global.$ = require('./_liv');
global.cfg = require('./cfg/node_cfg.json');

app.use(vhost(global.cfg.url, require('./node_servidor')));
app.disable('x-powered-by');
app.use(compression());
app.use(useragent.express());
app.listen(global.cfg.porta);

//http://localhost:5984/categorias/_design/geral/_view/categorias?key=1