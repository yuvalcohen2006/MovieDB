const express = require("express");
const router = new express.Router();
const actorController = require("../controllers/actorController");

router.post("/actor", actorController.createActor);
router.get("/actor", actorController.getActors);
router.get("/actor/id/:id", actorController.getActorById);
router.get("/actor/name/:name", actorController.getActorByName);
// MICHAL: אין צורך לכתוב update בroute עצמו, זה לא יתערבב עם אחרים כי אתה בpatch, זה חזרתי שלא לצורך
router.patch("/actor/update/:id", actorController.updateActor);
// MICHAL: כנל על מחיקה
router.delete("/actor/delete/:id", actorController.deleteActor);
router.get("/actor/rank/rating", actorController.getActorsByAvgRating);
// MICHAL: ; בסוף שורה
router.get("/actor/rank/age", actorController.getActorsByAge)
// MICHAL: צריך כאן שורה רווח
module.exports = router;
