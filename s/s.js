var qs = require("querystring");
require("http").createServer(function (req, res) {
    if ("/" == req.url) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end("<!DOCTYPE html><html><head></head><body><form method='POST' action='/url'>Nome? <input name='nome'><button>Enviar</button></formv</body></html>");
    } else if ("/url" == req.url && "POST" == req.method) {
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end("<p>O teu nome Ã© <b>" + qs.parse(body).nome + "</b></p>");
        });
    }
}).listen(3000);