var express = require('express');//For the webserver
var fs = require('fs');//For reading files
var config = require('./config/config.js');//For server configuration details
var https = require('https');//For TLS
var http = require('http');//For sending and receiving  HTTP requests
var path = require('./config/paths.js');//API scrapping info

var app = express();//Initializes express

//Loads paths to scrap
for(var i = 0; i < path.api_objects.get.length; i++){
    app.get(path.api_objects.get[i].inbound_url, function(req, res){
        res.send('');
    })
}

//Server variables
var server_https;
var server_http;

try {
    if (config.server.https) {
        var https_options = {};
        //Reads key and cert files
        https_options.key = fs.readFileSync(config.server.key),
        https_options.cert = fs.readFileSync(config.server.certificate)
        //Optional passphrase is added to options
        if(config.server.passphrase){
            https_options.passphrase = config.server.passphrase;
        }
        //Server is created on the configred port with the given address
        server_https = https.createServer(https_options, app).listen(config.server.secure_port, config.server.secure_address, function () {
            //Just for logging purposes
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
        //Starts regular HTTP server on given port and address
        server_http = http.createServer(app).listen(config.server.unsecure_port, config.server.unsecure_address, function () {
            var host = server_http.address().address;
            var port = server_http.address().port;
            console.log("HTTP Server listening at http://%s:%s", host, port);
        });
    }
} catch (err) {
    console.log("Failed to start HTTP server: " + err)
}