const Actor = require("../../models/actor");

const status = {
  created: 201,
  badReq: 400,
  notFound: 404,
};

const createActor = async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(status.created).send(actor);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getActors = async (req, res) => {
  try {
    const actors = await Actor.find({});
    res.send(actors);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(status.notFound).send("Actor not found");
    res.send(actor);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getActorByName = async (req, res) => {
  try {
    const actor = await Actor.findOne({ Name: req.params.name });
    if (!actor) return res.status(status.notFound).send("Actor not found");
    res.send(actor);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const updateActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(status.notFound).send("Actor not found");
    Object.keys(req.body).forEach(
      (update) => (actor[update] = req.body[update]),
    );
    await actor.save();
    res.send(actor);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) return res.status(status.notFound).send("Actor not found");
    res.send(actor);
  } catch (err) {
    res.status(status.badReq).send(err.message);
  }
};

const getActorsByAvgRating = async (req, res) => {
  try {
    const actors = await Actor.find({}).populate("Movies");

    const rankedActors = actors
      .map((actor) => {
        const ratedMovies = actor.Movies;

        const avgRating =
          ratedMovies.reduce((sum, movie) => sum + movie.Rating, 0) /
          ratedMovies.length;

        return {
          Name: actor.Name,
          avgRating: avgRating,
        };
      })
      .sort((a, b) => {
        return b.avgRating - a.avgRating;
      });

    res.send(rankedActors);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

const getActorsByAge = async (req, res) => {
  try {
    const actors = await Actor.find({}).sort({ Age: -1 });

    res.send(actors);
  } catch (err) {
    res.status(status.serverErr).send(err.message);
  }
};

module.exports = {
  createActor,
  getActors,
  getActorById,
  getActorByName,
  updateActor,
  deleteActor,
  getActorsByAvgRating,
  getActorsByAge
};
