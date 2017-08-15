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
try {
    if (config.server.https) {
        var https_options = {};
        https_options.key = fs.readFileSync(config.server.key),
        https_options.cert = fs.readFileSync(config.server.certificate)
        if(config.server.passphrase){
            https_options.passphrase = config.server.passphrase;
        }
        server_https = https.createServer(https_options, app).listen(config.server.secure_port, config.server.secure_address, function () {
            var host = server_https.address().address;
            var port = server_https.address().port;
            console.log("HTTPS Server listening at http://%s:%s", host, port);
        });
    }
} catch (err) {
    console.log("Failed to start HTTPS server: " + err)
}
try {
    if (config.server.http) {
        server_http = http.createServer(app).listen(config.server.unsecure_port, config.server.unsecure_address, function () {
            var host = server_http.address().address;
            var port = server_http.address().port;
            console.log("HTTP Server listening at http://%s:%s", host, port);
        });
    }
} catch (err) {
    console.log("Failed to start HTTP server: " + err)
}