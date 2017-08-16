var config = {};
config.server = {};

config.server.http = true;//Whether HTTP should be supported
config.server.https = true;//Whether HTTP over TLS should be supported

//For HTTP server
config.server.unsecure_port = 80;//Port to access unsecured API
config.server.unsecure_address = "";//The address the server should listen on. Leave empty for all addresses
//For HTTPS server
config.server.secure_port = 443;//Port to access TLS encrypted API
config.server.secure_address = "";//The address the server should listen on. Leave empty for all addresses

config.server.certificate = "./certs/dev.localhost.com.cert";//Certificate file for TLS encryption
config.server.key = "./certs/dev.localhost.com.key";//Key file for TLS encryption
config.server.passphrase = "test";//Passphrase to open key file. Leave blank if it is not password protected


module.exports = config;