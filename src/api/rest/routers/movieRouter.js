const express = require("express");
const router = new express.Router();
const movieController = require("../controllers/movieController");

router.post("/movie", movieController.createMovie);
router.get("/movie", movieController.getMovies);
router.get("/movie/id/:id", movieController.getMovieById);
router.get("/movie/name/:name", movieController.getMovieByName);
router.patch("/movie/update/:id", movieController.updateMovie);
router.delete("/movie/delete/:id", movieController.deleteMovie);
router.get("/movie/actor-movies/:name", movieController.getMoviesByActorName);
router.get("/movie/genre/:genre", movieController.getMoviesByGenre)
router.get("/movie/rank/release", movieController.getMoviesByRelease)
router.get("/movie/above-rating/:rating", movieController.getMoviesAboveRating)
router.get("/movie/between/:start/:end", movieController.getMoviesInRange)
module.exports = router;
