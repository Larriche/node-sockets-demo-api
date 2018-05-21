'use strict';

const auth = require('../controllers/auth');
const express = require("express");
const router = express.Router();

router.post('/auth', auth.authenticate);

module.exports = router;
