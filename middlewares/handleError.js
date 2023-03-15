function handleError(err, req, res, next) {
  const { statusCode = 500 } = err;
  let { message } = err;

  if (statusCode === 500) {
    message = 'На сервере произошла ошибка';
  }

  res.status(statusCode).send({ message });
  next();
}

module.exports = { handleError };
