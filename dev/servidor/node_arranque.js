///* global global, __dirname */
//global.$ = require('./_liv');
//global.cfg = require('./../s/cfg/node_cfg.json');
//var express = require('express'),
//        app = express(),
//        useragent = require('express-useragent'), 
//        compression = require('compression'),
//        vhost = require('vhost'),
//        tls = require('./../s/_tls.js');
//
//app.use(vhost(global.cfg.url, require(global.cfg.dir_raiz + 's/servidor_node.js')));
//app.disable('x-powered-by');
//app.use(compression());
//app.use(useragent.express());
//app.listen(global.cfg.porta);
////tls.iniciar({"tls": {"ativo": global.cfg.tls}, "porta": global.cfg.porta}, app);

var express = require('express');
global.$ = require('./_liv');
$.iniciar();

var app = express();
app.get('/', function (req, res) {
  res.send('../p/d/principal.html');
});

app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
//     res.sendFile( __dirname + req.params[0]); 
     res.sendFile('principal.html', {root: __dirname + "/../publico/diversos"});
 });

app.listen(8080, function () {
  console.log('Em escuta na porta 3000');
});

//http://localhost:5984/categorias/_design/geral/_view/categorias?key=1