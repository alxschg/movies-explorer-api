const express = require('express');

const { users } = require('./users');
const { movies } = require('./movies');
const { NotFoundError } = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { createUserValidator } = require('../utils/validators/createUserValidator');
const { loginValidator } = require('../utils/validators/loginValidator');

const routes = express.Router();

routes.all('*', express.json());

routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);

routes.all('*', auth);

routes.use('/users', users);
routes.use('/movies', movies);

routes.all('*', (req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

module.exports = { routes };
