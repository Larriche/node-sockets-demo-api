'use strict';

var express = require("express");
var app = express();
var jsonParser = require("body-parser");
var sequelize = require("./models").sequelize;

var port = process.env.PORT || 3030;

app.listen(port, function () {
    console.log("Express server is listening on port", port);
});
