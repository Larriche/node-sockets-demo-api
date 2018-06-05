'use strict';

const express = require("express");
const app = express();
const http = require("http").Server(app);
const jsonParser = require("body-parser");
const apiRoutes = require('./src/routes');
const bodyParser = require('body-parser');
const config = require('./config/config');
const moment = require('moment');
const middlewares = require('./src/middlewares');
const io = require('socket.io')(http);

const SocketIO = require('./src/services').socketio(io);

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

http.listen(port, function () {
    console.log("Express server is listening on port", port);
});

module.exports = app;
