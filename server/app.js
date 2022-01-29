const express = require('express');
const logger = require('morgan');
const cors = require('cors');
//const path = require("path");

const app = express();
app.use(cors());

app.use(logger('short'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/rates'));

app.get('*', (req, res) => {
  res.status('404').json({ success: false, message: 'Resource not found' });
});

module.exports = app;
