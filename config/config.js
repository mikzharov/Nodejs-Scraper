var config = {};
config.server = {};

config.server.http = true;
config.server.https = true;

//For HTTP server
config.server.unsecure_port = 80;
config.server.unsecure_address = "";
//For HTTPS server
config.server.secure_port = 443;
config.server.secure_address = "";

config.server.certificate = "./certs/dev.localhost.com.cert";//Fake cert for localhost.admin.daplie.me
config.server.key = "./certs/dev.localhost.com.key";
config.server.passphrase = "test";


module.exports = config;