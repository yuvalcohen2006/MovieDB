const express = require("express");
const router = new express.Router();
const actorController = require("../controllers/actorController");

router.post("/actor", actorController.createActor);
router.get("/actor", actorController.getActors);
router.get("/actor/id/:id", actorController.getActorById);
router.get("/actor/name/:name", actorController.getActorByName);
router.patch("/actor/update/:id", actorController.updateActor);
router.delete("/actor/delete/:id", actorController.deleteActor);
router.get("/actor/rank/rating", actorController.getActorsByAvgRating);
router.get("/actor/rank/age", actorController.getActorsByAge)
module.exports = router;
