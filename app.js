require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { routes } = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
mongoose.set('strictQuery', false);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(cors());

app.use(requestLogger);

app.use(helmet());

app.use(express.json());
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('App started.');
});
