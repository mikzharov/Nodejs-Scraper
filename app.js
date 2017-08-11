var express = require('express');
var fs = require('fs');
var app = express();

app.get('/hi', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})