const express = require('express');
const router = express.Router();

const getter = require('../controller/getter');

router.get('/getter', getter);

module.exports = router;