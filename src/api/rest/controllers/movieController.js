const Movie = require("../../models/movie");
const Actor = require("../../models/actor");
const getMovie = require("../../utils/movies");
const getActor = require("../../utils/actors");

const status = {
  created: 201,
  badReq: 400,
  notFound: 404,
  serverErr: 500,
};

const createMovie = async (req, res) => {
  const { name, rating, date } = req.body;

  try {
    const movieData = await getMovie(name);

    if (!movieData) {
      return res.status(status.notFound).send({ error: "Movie not found" });
    }

    const movie = new Movie({
      Title: movieData.Title,
      Year: parseInt(movieData.Year),
      Director: movieData.Director,
      WatchedAt: date || Date.now(),
      Rating: parseInt(rating),
      Rated: movieData.Rated,
      Released: movieData.Released,
      Genre: movieData.Genre,
    });

    const savedMovie = await movie.save();

    if (movieData.Actors && movieData.Actors !== "N/A") {
      const actorNames = movieData.Actors.split(", ");
      for (let name of actorNames) {
        const actorData = await getActor(name);

        if (actorData) {
          await Actor.findOneAndUpdate(
            { Name: name },
            {
              $set: {
                Age: actorData.age,
                Gender: actorData.gender,
                Height: actorData.height || "N/A",
                IsAlive: actorData.is_alive,
              },
              $addToSet: { Movies: savedMovie._id },
            },
            { upsert: true, returnDocument: "after" },
          );
        }
      }
    }

    res.status(status.created).send(savedMovie);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(status.notFound).send("Movie not found");
    res.send(movie);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getMovieByName = async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.name });
    if (!movie) return res.status(status.notFound).send("Movie not found");
    res.send(movie);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(status.notFound).send("Couldn't find the movie");

    Object.keys(req.body).forEach(
      (update) => (movie[update] = req.body[update]),
    );

    await movie.save();
    res.send(movie);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndDelete(movieId);

    if (!movie) {
      return res.status(status.notFound).send("Couldn't find the movie");
    }

    await Actor.updateMany({ Movies: movieId }, { $pull: { Movies: movieId } });

    await Actor.deleteMany({ Movies: { $size: 0 } });

    res.send(movie);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getMoviesByActorName = async (req, res) => {
  try {
    const actorName = req.params.name;
    const actor = await Actor.findOne({ Name: actorName }).populate("Movies");

    if (!actor) {
      return res.status(status.notFound).send("Actor not found");
    }

    const movieTitles = actor.Movies.map((movie) => movie.Title);

    res.send(movieTitles);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getMoviesByGenre = async (req, res) => {
  const inputGenre = req.params.genre.trim().toLowerCase();

  try {
    const movies = await Movie.find({});

    const filteredMovies = movies.filter((movie) => {
      return movie.Genre.split(",")
        .map((g) => g.trim().toLowerCase())
        .includes(inputGenre);
    });

    res.send(filteredMovies);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

const getMoviesByRelease = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ Released: -1 });

    res.send(movies);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

const getMoviesAboveRating = async (req, res) => {
  const rating = req.params.rating;
  try {
    const movies = await Movie.find({ Rating: { $gt: rating } });
    res.send(movies);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

const getMoviesInRange = async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;

  try {
    const movies = await Movie.find({ Year: { $gt: start, $lt: end } });
    res.send(movies);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  getMovieByName,
  updateMovie,
  deleteMovie,
  getMoviesByActorName,
  getMoviesByGenre,
  getMoviesByRelease,
  getMoviesAboveRating,
  getMoviesInRange,
};
