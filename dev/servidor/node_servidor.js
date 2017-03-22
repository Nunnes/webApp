/* global global, __dirname */
var useragent = require('express-useragent'),
        express = require('express'),
        sessao = require('express-session'),
        armazenamento_ficheiros = require('session-file-store')(sessao),
        compression = require('compression'),
        app = express(),
        favicon = require('serve-favicon');


//global.querystring = require('querystring');
global.fs = require("fs");
//global.liv = require('./_liv');
global.db = require('./_interface_couchdb');

//global.zlib = require('zlib');

app.disable('x-powered-by');
app.use(compression());
app.use(useragent.express());

app.use(favicon(__dirname + "./../r/favicon.ico"));
app.use(express.static(__dirname + "./../r", {maxAge: global.cfg.diasCache}));
app.use("/p/d", express.static(__dirname + "/../p/d", {maxAge: global.cfg.diasCache}));
app.use("/c", express.static(__dirname + "/../p/c", {maxAge: global.cfg.diasCache}));
app.use("/i", express.static(__dirname + "/../p/i", {maxAge: global.cfg.diasCache}));
app.use("/j", express.static(__dirname + "/../p/j", {maxAge: global.cfg.diasCache}));

app.use(sessao({
    store: new armazenamento_ficheiros({"path": __dirname + "./../sessoes"}),
    secret: 'gFnO2016!',
    resave: true,
    cookie: {secure: false},
    saveUninitialized: true
}));

/*app.get('/p/d', function (pedido, resposta) {
 console.log(pedido.params[0]);
 resposta.header("Cache-Control", "max-age=" + global.cfg.diasCache + " , public");
 resposta.sendFile(pedido.params[0], {root: __dirname + "/../p/d/"});
 });*/

app.get('/', function (pedido, resposta) {
    resposta.header("Cache-Control", "max-age=" + global.cfg.diasCache + " , public");
    resposta.sendFile('principal.html', {root: __dirname + "/../p/d/"});
    
});


app.all('/j/p.json', function (pedido, resposta) {
    var corpo = '';
    //console.log(pedido);
    global.conteudo_sessao = pedido.session;
    if (!global.conteudo_sessao.autenticacao) {
        global.conteudo_sessao.autenticacao = {"sid": null, "utilizador": null};
    }
    
    pedido.on('data', function (dados) {
        corpo += dados;
        if (corpo.length > 1e6) {
            pedido.connection.destroy();
            return;
        }
    });

    pedido.on('end', function () {
       var pedidos = require('./pedidos');
       pedidos.executar(resposta, pedido);
    }, 'utf-8');
});

app.get('/c', function (pedido, resposta) {
    var telefone_inteligente = pedido.useragent.isMobile;
    var f = (telefone_inteligente ? "m" : "c") + ".css";
    var o = {
        root: __dirname + "/../p/c/",
        headers: {
            'x-timestamp': Date.now(),
            'Cache-Control': 'public, max-age=' + global.cfg.diasCache,
            'x-sent': true
        }
    };
    resposta.sendFile(f, o, function (e) {
        if (e) {
            resposta.status(e.status).end();
        }
    });
});

app.get('*', function (pedido, resposta, seguinte) {
    var erro = new Error();
    erro.status = 404;
    seguinte(erro);
});

app.use(function (erro, pedido, resposta, seguinte) {
    if (erro.status !== 404) {
        return seguinte();
    }
    resposta.sendStatus(404);
});

module.exports = app;
