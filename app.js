'use strict';

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const jsonParser = require("body-parser");
const apiRoutes = require('./src/routes');
const bodyParser = require('body-parser');


var port = process.env.PORT || 5000;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', apiRoutes);

const ActivitiesService = require('./src/services').activities;

io.on('connection', socket => {
    console.log('a client connected to the web socket');

    socket.on('message', message => {
        let data = {
            type: 'message',
            from_id: 1,
            to_id: 1,
            message: message
        };

        ActivitiesService.save(data).then(newMessage => {
            console.log(newMessage);
            io.emit('message', newMessage);
        });
    });
});

http.listen(port, function () {
    console.log("Express server is listening on port", port);
});
