const { celebrate, Joi } = require('celebrate');

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = { deleteMovieValidator };
