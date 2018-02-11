var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(8080);

app.use(express.static('public'));
//simple server just static serving