'use strict';

var express = require("express");
var app = express();
var io = require('socket.io');
var routes = require("./routes");
var jsonParser = require("body-parser");


app.use("/questions", routes);

var port = process.env.PORT || 3030;

io.listen(app.listen(port));

io.sockets.on("connection", function(socket){
    socket.emit("Start_Chat");
});

