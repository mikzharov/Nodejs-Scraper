var config = {};
config.server = {};

config.server.http = true;
config.server.https = false;

//For HTTP server
config.server.unsecure_port = 80;
config.server.unsecure_address = "";
//For HTTPS server
config.server.secure_port = 443;
config.server.secure_address = "";


module.exports = config;