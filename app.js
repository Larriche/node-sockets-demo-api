'use strict';

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const jsonParser = require("body-parser");
const apiRoutes = require('./src/routes');
const bodyParser = require('body-parser');
const config = require('./config/config');
const moment = require('moment');
const middlewares = require('./src/middlewares');
moment.tz.setDefault(config.development.timezone);

const port = process.env.PORT || 5000;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(middlewares.setHeaders);

// Authentication middleware for non login routes
app.use(middlewares.useMiddleware({
    except: ['/api/auth/login', '/api/auth/signup']
}, middlewares.verifyAuthentication));

app.use('/api', apiRoutes);

const ActivitiesService = require('./src/services').activities;
const UsersService = require('./src/services').users;

io.on('connection', socket => {
    console.log('a client connected to the web socket');

    socket.on('log_visit', clientData => {
        let userId  = clientData.userId;
        let data = {
            lastVisit: new Date()
        };

        UsersService.update(userId, data);
    });

    socket.on('room', function (room) {
        console.log('joining ' + room);
        socket.join(room);
    });

    socket.on('message', clientData => {
        // The admin is the only one whom messages can be sent to
        let adminId = 1; // hardcoding admin id for now :)
        let data = {
            type: 'message',
            from_id: clientData.fromId,
            to_id: clientData.toId ? clientData.toId : adminId,
            message: clientData.message
        };

        ActivitiesService.save(data).then(savedMessage => {
            ActivitiesService.get({id: savedMessage.id})
                .then(newMessage => {
                    let senderRoom = 'user_' + newMessage.fromId;
                    let receiverRoom = 'user_' + newMessage.toId;
                    let updateData = {
                        lastActivity: newMessage.createdAt
                    };

                    UsersService.update(newMessage.fromId, updateData);
                    io.sockets.in(senderRoom).emit('message', newMessage);
                    io.sockets.in(receiverRoom).emit('message', newMessage);
                });
        });
    });

    socket.on('statistic', clientData => {
        let adminId = 1;
        let data = {
            type: 'statistic',
            subType: clientData.type,
            message: clientData.action,
            from_id: clientData.fromId,
            to_id: adminId
        };

        ActivitiesService.save(data).then(newStatistic => {
            let updateData = {
                lastActivity: newStatistic.createdAt
            };

            UsersService.update(newStatistic.fromId, updateData);
        });
    });

    socket.on('command', clientData => {
        let data = {
            type: 'command',
            message: clientData.command,
            from_id: clientData.fromId,
            to_id: clientData.toId
        };

        ActivitiesService.save(data).then(newCommand => {
            let receiverRoom = 'user_' + newCommand.toId;
            let updateData = {
                lastActivity: newCommand.createdAt
            };

            UsersService.update(newCommand.fromId, updateData);
            io.sockets.in(receiverRoom).emit('command', newCommand);
        });
    });
});

http.listen(port, function () {
    console.log("Express server is listening on port", port);
});

module.exports = app;
