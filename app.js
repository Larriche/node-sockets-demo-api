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

    socket.on('room', function (room) {
        console.log('joining ' + room);
        socket.join(room);
    });

    socket.on('message', clientData => {
        // The admin is the only one whom messages can be sent to
        let adminId = 1; // hardcoding admin id for now;
        let data = {
            type: 'message',
            from_id: clientData.fromId,
            to_id: clientData.toId ? clientData.toId : adminId,
            message: clientData.message
        };

        ActivitiesService.save(data).then(newMessage => {
            let senderRoom = 'user_' + newMessage.fromId;
            let receiverRoom = 'user_' + newMessage.toId;

            io.sockets.in(senderRoom).emit('message', newMessage);
            io.sockets.in(receiverRoom).emit('message', newMessage);
        });
    });

    socket.on('statistic', clientData => {
        let adminId = 1;
        let data = {
            type: clientData.type,
            message: clientData.action,
            from_id: clientData.fromId,
            to_id: adminId,
        };

        ActivitiesService.save(data).then(newStatistic => {
            console.log(newStatistic);
        });
    });
});

http.listen(port, function () {
    console.log("Express server is listening on port", port);
});
