const { Movie } = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { OwnerError } = require('../errors/OwnerError');

async function deleteMovie(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id).populate('owner');

    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    const ownerId = movie.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new OwnerError('Разные владельцы');
    }

    await Movie.findByIdAndRemove(id);

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
