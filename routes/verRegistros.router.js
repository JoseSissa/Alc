const express = require('express');
const router = express.Router();

const verRegistros = require('../controllers/verRegistros.controller');

router.get('/peticionRegistros', verRegistros.peticionRegistros);

module.exports = router;