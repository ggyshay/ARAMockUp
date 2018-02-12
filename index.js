var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static('public'));
//simple server just static serving