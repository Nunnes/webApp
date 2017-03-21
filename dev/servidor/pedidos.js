module.exports = {
    executar: function (resposta, pedido) {
        var d = JSON.parse(pedido.query["d"]),
                url = "categorias/_design/geral/_view/categorias?key=1",
               
		 sucesso = function (dados) {
			console.log("resposta:" +dados);
			resposta.send(dados);
                };
        
        console.log("url " + url);

        if (!"i" in d) {
            //send error page
            this.resposta_erro(resposta);
        }

        d.i = Number(d.i);

        switch (d.i) {
            case 1:
                //pedir ao couch a lista de categorias
                console.log("switch d.i:" + d.i);

                //global.db.pedir(sucesso, url, "GET");
		global.db.getCats(sucesso);                
		break;
            case 4:
                //pedir ao couch a lista de categorias
                console.log("switch d.i:" + d.i);

               global.db.getItems(sucesso);                
		break;
            default:
                this.resposta_erro(resposta);
        }
    },
    
    resposta_erro: function (resposta) {
        resposta.sendStatus(404);    }
    
};
