'use strict';

const auth = require('../controllers/auth');
const messages = require('../controllers/messages');
const users = require('../controllers/users');
const activities = require('../controllers/activities');

const express = require("express");
const router = express.Router();

// Authentication
router.post('/auth/login', auth.authenticate);
router.post('/auth/signup', auth.signup);

// Messages
router.get('/messages', messages.getAll);

// Users
router.get('/users', users.getAll);

// All activities
router.get('/activities', activities.getAll);

module.exports = router;
