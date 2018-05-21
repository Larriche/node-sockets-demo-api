'use strict';

const express = require("express");
const app = express();
const jsonParser = require("body-parser");
const sequelize = require("./models").sequelize;
const apiRoutes = require('./routes');
const bodyParser = require('body-parser');


var port = process.env.PORT || 5000;

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Express server is listening on port", port);
});
