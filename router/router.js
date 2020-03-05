const express = require('express');
const router = express.Router();

const getter = require('../controller/getter');
const getOne = require('../controller/getOne');
const inserter = require('../controller/inserter');
const updater = require('../controller/updater');
const deleter = require('../controller/deleter');
const register = require('../controller/register');

router.get('/getter/:coll', getter);
router.get('/getter/:coll/:oid', getOne);
router.post('/inserter/:coll', inserter);
router.post('/updater/:coll/:id', updater);
router.delete('/deleter/:coll/:id', deleter);
router.post('/register', register);

module.exports = router;