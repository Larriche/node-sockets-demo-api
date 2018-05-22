'use strict';

const auth = require('../controllers/auth');
const messages = require('../controllers/messages');
const users = require('../controllers/users');

const express = require("express");
const router = express.Router();

// Authentication
router.post('/auth/login', auth.authenticate);

// Messages
router.get('/messages', messages.getAll);

// Users
router.get('/users', users.getAll);


module.exports = router;
