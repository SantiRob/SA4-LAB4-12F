const express = require('express');
const routes = require('./routes');
const logger = require('./middlewares/logger');

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
