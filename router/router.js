const express = require('express');
const router = express.Router();

const getter = require('../controller/getter');
const inserter = require('../controller/inserter');
const updater = require('../controller/updater');
const deleter = require('../controller/deleter');

router.get('/getter/:coll', getter);
router.post('/inserter/:coll', inserter);
router.post('/updater/:coll/:id', updater);
router.delete('/deleter/:coll/:id', deleter);

module.exports = router;