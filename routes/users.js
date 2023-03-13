const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const users = express.Router();

users.get('/me', getUserInfo);
users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo,
);

module.exports = { users };
