/* global this */

var nano = require('nano')('http://localhost:5984');
var db = nano.db.use('categorias');

//var data = { 
//    name: 'categorias', 
//    cat: [3,3],
//    subcat: [[2,2],[3,3],[4,4],[4,4]] 
//};
//
//db.insert(data, 'unique_id', function(err, body){
//  if(!err){
//    //awesome
//  }
//});

$ = require("./_liv");

/* 
 * Lida com os pedidos entre o servidor e o CouchDB
 */
module.exports = {
    couchdb_opcoes: {
        protocol: global.cfg.couchdb.protocolo,
        host: global.cfg.couchdb.ip,
        port: global.cfg.couchdb.porta,
        path: "/",
        method: 'GET'
    },
    /**
     * Faz um pedido automático ao servidor CouchDB
     * @param {string} url do pedido
     * @param {int} idx Indice de referência
     * @param {callback} cb função a chamar no final com o resultado. False se não funcionar
     */
    pedir_auto: function (url, idx, cb) {
        this.pedir(
                function (resposta) {
                    if (typeof resposta === "object") {
                        cb(idx, resposta);
                    } else {
                        cb(idx, false);
                    }
                },
                url
                );
    },
    /**
     * Faz um pedido ao servidor CouchDB
     * @param {callback} retorno  Função a chamar quando se tem a resposta do servidor
     * @param {string} uri  Endereço do pedido
     * @param {string} metodo   Opcional. GET|POST|PUT....
     * @param {object} dados    Opcional. Objeto com os POST|PUT a enviar para o servidor
     * @param {callback} p1     Opcional. Passar uma chamada de retorno a ser enviada como parâmetro na chamada de retorno original
     */
    //  JSON.parse(dados)
    pedir: function (retorno, uri, metodo, dados, p1) {
        var DadosPost, pedido, r2 = (typeof dados === "object" ? $.jsy(dados) : uri);
        if (uri === undefined) {
            return;
        }
        uri = "/" + uri;
        this.couchdb_opcoes.path = uri;
        this.couchdb_opcoes.method = (metodo) ? metodo.toUpperCase() : "GET";
        if (typeof dados === "object") {
            DadosPost = $.jsy(dados);
            this.couchdb_opcoes.headers = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(DadosPost)
            };
        }
        chamada_retorno = function (resposta) {
            var dados = '';
            resposta.setEncoding('utf8');
            resposta.on('data', function (parte) {
                dados += parte;
            });
            resposta.on('end', function () {
                if (typeof retorno === "function") {
                    if (p1) {
                        retorno(JSON.parse(dados), p1);
                    } else {
                        retorno(JSON.parse(dados));
                    }
                }
            });

            resposta.on('error', function (e) {
                console.log({"ficheiro": "com_servidor_couchdb.js", "mensagem": e.message, "notas": {"couchdb_opcoes": this.couchdb_opcoes}});
                return;
            });
        };
        http = require("http");
        pedido = http.request(this.couchdb_opcoes, chamada_retorno);
        pedido.end(typeof dados === "object" ? DadosPost : null, "utf8");
    },

	getCats : function(retorno){
 	 db.view('getCats', 'cats', {'key': null, 'include_docs': false}, function(err, body){
	    if(!err){
		var rows = body.rows; 
//                console.log(rows);
		retorno(rows);
	    }else{
	console.log(err);
	}
	 });
},
	getSubCats : function(key, retorno){
	 	 db.view('getsubcat', 'subcat', {'key': key, 'include_docs': false}, function(err, body){
		    if(!err){
//			console.log("getSubCats");
//                        console.log(key);
                        
                        var rows = body.rows; //the rows returned
//			console.log(rows);
			retorno(rows);
		    }else{
		console.log(err);
		}
	    });
	}
};
