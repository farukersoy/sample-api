const express = require('express');
const router = express.Router();

const checkToken = require('../middlewares/checkToken');

const getter = require('../controller/getter');
const getOne = require('../controller/getOne');
const inserter = require('../controller/inserter');
const updater = require('../controller/updater');
const deleter = require('../controller/deleter');
const register = require('../controller/register');
const login = require('../controller/login');

router.get('/getter/:coll', checkToken, getter);
router.get('/getter/:coll/:oid', checkToken, getOne);
router.post('/inserter/:coll', checkToken, inserter);
router.post('/updater/:coll/:id', checkToken, updater);
router.delete('/deleter/:coll/:id', checkToken, deleter);
router.post('/register', register);
router.post('/login', checkToken, login);

module.exports = router;