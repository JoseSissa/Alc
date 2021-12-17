const express = require('express');
const router = express.Router();
const RegisterService = require('../services/register.service');

router.get('/register', RegisterService.register());

module.exports = router;