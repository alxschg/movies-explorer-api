const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

const movies = express.Router();

movies.get('/', getMovies);
movies.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().regex(/https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      trailerLink: Joi.string().regex(/https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      thumbnail: Joi.string().regex(/https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  saveMovie,
);
movies.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = { movies };
