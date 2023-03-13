const { Movie } = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

async function deleteMovie(req, res, next) {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId).populate('owner');

    if (!movie) {
      throw new NotFoundError('Фильм или пользователь не найден или был запрошен несуществующий роут');
    }
    const ownerId = movie.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new UnauthorizedError('Для обработки запроса необходима авторизация');
    }

    await Movie.findByIdAndRemove(movieId);

    res.send(movie);
  } catch (err) {
    next(err);
  }
}

async function saveMovie(req, res, next) {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const ownerId = req.user._id;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: ownerId,
    });

    await movie.populate('owner');
    res.status(201).send(movie);
  } catch (err) {
    next(err);
  }
}

async function getMovies(req, res, next) {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId }).populate('owner');
    res.send(movies);
  } catch (err) {
    next(err);
  }
}

module.exports = { deleteMovie, saveMovie, getMovies };
