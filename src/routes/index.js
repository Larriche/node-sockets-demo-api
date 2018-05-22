'use strict';

const auth = require('../controllers/auth');
const messages = require('../controllers/messages');
const express = require("express");
const router = express.Router();

// Authentication
router.post('/auth/login', auth.authenticate);

// Messages
router.get('/messages', messages.getAll);


module.exports = router;
