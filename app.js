var express = require('express');
var fs = require('fs');
var config = require('./config/config.js');
var app = express();
var https = require('https');
var http = require('http');


app.get('/hi', function (req, res) {
    res.send('Hello World');
})

var server_https;
var server_http;
if (config.server.https) {
    server_https = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(config.server.secure_port, config.server.secure_address, function () {
        var host = server_https.address().address;
        var port = server_https.address().port;
        console.log("HTTPS Server listening at http://%s:%s", host, port);
    });
}
if (config.server.http) {
    server_http = http.createServer(app).listen(config.server.unsecure_port, config.server.unsecure_address, function () {
        var host = server_http.address().address;
        var port = server_http.address().port;
        console.log("HTTP Server listening at http://%s:%s", host, port);
    });
}