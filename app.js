const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const router = require('./router/router');

const app = express();
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/', router);
app.use(notFound);
app.use(errorHandler);

module.exports = app;