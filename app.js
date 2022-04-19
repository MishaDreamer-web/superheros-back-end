const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;

const superherosRouter = require('./routes/superheros/superheros_routes');
const usersRouter = require('./routes/users/users_routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.static(SUPERHEROS_IMAGES));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/users', usersRouter);
app.use('/api/superheros', superherosRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(500).json({
    status: statusCode === 500 ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
