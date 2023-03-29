const express = require('express');
const routes = require('./routes');

const appExpress = express();

appExpress.use(express.json())
appExpress.use(routes);

module.exports = appExpress;