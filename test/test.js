'use strict'

const testApi = require('./api.int.test.js');
const testServices = require('./services.unit.test.js');
const bcrypt = require('bcrypt');

testApi();
testServices();