'use strict';

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io').listen(http);
const jsonParser = require("body-parser");
const sequelize = require("./models").sequelize;
const apiRoutes = require('./routes');
const bodyParser = require('body-parser');


var port = process.env.PORT || 5000;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

io.on('connection', socket => {
    console.log('a client connected to the web socket');
});

http.listen(port, function () {
    console.log("Express server is listening on port", port);
});
