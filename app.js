var express = require('express');//For the webserver
var fs = require('fs');//For reading files
var config = require('./config/config.js');//For server configuration details
var https = require('https');//For TLS
var http = require('http');//For sending and receiving  HTTP requests
var url = require('url');//For parsing urls
var path = require('./config/paths.js');//API scrapping info

var app = express();//Initializes express

//Loads paths to scrap
for (var i = 0; i < path.api_objects.get.length; i++) {
    //Sets options for HTTP request
    var option_port;//Outbound port to connect to
    var outbound_security;//Whether to use HTTPS or HTTP

    //Makes sure port and protocol are correct
    const parsed_url = url.parse(path.api_objects.get[i].outbound_url);
    if (parsed_url.protocol) {
        if (parsed_url.protocol == 'https:') {
            option_port = 443;
            outbound_security = 'https:';
        } else if (parsed_url.protocol == 'http:') {
            option_port = 80;
            outbound_security = 'http:';
        } else {
            console.log('Object ' + parsed_url.href + " does not have a protocol, using HTTP");
            outbound_security = 'http:';
        }
    }
    //Makes sure there is a port
    if (parsed_url.port) {
        option_port = parsed_url.port;
    } else if (!option_port) {
        console.log('Object ' + parsed_url.href + " does not have a port, using 80");
        option_port = 80;
    }
    var options = {
        host: parsed_url.hostname,//Sets hostname
        port: option_port,//Sets port to connect to
        path: parsed_url.pathname,//Sets the pathname to fetch
        path_parameters:'',
        method: path.api_objects.get[i].outbound_method,//Sets the method to use
        headers: path.api_objects.get[i].outbound_headers,
    };
    if(parsed_url.auth){
        var auth_header = 'Basic ' + new Buffer(parsed_url.auth).toString('base64');
        options.headers.Authorization = auth_header;
    }
    console.log(options.headers)

    app.get(path.api_objects.get[i].inbound_url, function (inbound_req, inbound_res) {
        //Replace outbound URL parameters with inbound_req parameters

        Object.keys(inbound_req.params).forEach(function (key) {
            options.path = options.path.replace(":" + key, inbound_req.params[key]);
        });
        //Same object for HTTP or HTTPS connection depending on switch statement below
        var outbound_req;
        //The result of the request
        var body = "";
        //The callback which parses the request
        function callback(outbound_res) {
            outbound_res.on('data', function (d) {
                body += d;
            });
            outbound_res.on('end', function () {
                inbound_res.send(body);
            });
        }
        //Decides whether to use HTTP or HTTPS
        switch (outbound_security) {
            case 'https:':
                outbound_req = https.request(options, callback);
                break;
            case 'http:':
                outbound_req = http.request(options, callback);
                break;
        }
        outbound_req.end();//Ends request. This is required by express
        outbound_req.on('error', function (e) {//If there are errors it should output them as json objects.
            console.error(e);//TODO
        });
    })
}

//Server variables
var server_https;
var server_http;

try {
    if (config.server.https) {
        var https_options = {};
        //Reads key and cert files
        https_options.key = fs.readFileSync(config.server.key);
        https_options.cert = fs.readFileSync(config.server.certificate);
        //Optional passphrase is added to options
        if (config.server.passphrase) {
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