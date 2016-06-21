/* global global, __dirname */

var useragent = require('express-useragent'), 
        express = require('express'), 
        sessao = require('express-session'), 
        armazenamento_ficheiros = require('session-file-store')(sessao),
        compression = require('compression'), 
        app = express(), 
        favicon = require('serve-favicon');

global.querystring = require('querystring');
global.fs = require("fs");
global.$ = require('./_liv');
global.db = require('./_interface_couchdb.js');
global.zlib = require('zlib');

app.disable('x-powered-by');
app.use(compression());
app.use(useragent.express());
app.use(favicon(__dirname + "/../publico/raiz/favicon.ico"));
app.use(express.static(__dirname + "/../publico/raiz", {maxAge: global.cfg.diasCache}));
app.use("/g", express.static(__dirname + "/../publico/grafismo", {maxAge: global.cfg.diasCache}));
app.use("/p", express.static(__dirname + "/../publico/diversos", {maxAge: global.cfg.diasCache}));
app.use("/j", express.static(__dirname + "/../publico/json", {maxAge: global.cfg.diasCache}));

app.use(sessao({
    store: new armazenamento_ficheiros({"path": __dirname + "/../sessoes"}),
    secret: 'gFnO2016!',
    resave: true,
    cookie: {secure: false},
    saveUninitialized: true
}));

app.get('/', function (pedido, resposta) {
    resposta.header("Cache-Control", "max-age=" + global.cfg.diasCache + " , public");
    resposta.sendFile('principal.html', {root: __dirname + "/../publico/diversos"});
});

app.all('/j/p.json', function (pedido, resposta) {
    var corpo = '';
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
        pedidos.executar(resposta, corpo);
    }, 'utf-8');
});

app.get('/css', function (pedido, resposta) {
    $.telefone_inteligente = pedido.useragent.isMobile;
    var f = "geral_" + ($.telefone_inteligente ? "telemovel" : "computador") + ".css";
    var o = {
        root: __dirname + "/../publico/grafismo/",
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