/* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/ */
const express = require("express");
const router = express.Router();
const itineraries = require("../services/itineraries");

/* GET all itineraries for a user. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await itineraries.get(req));
  } catch (err) {
    console.error(`Error while getting itineraries `, err.message);
    next(err);
  }
});

/* POST new itinerary for a user */
router.post("/", async function (req, res, next) {
  try {
    res.json(await itineraries.create(req.body));
  } catch (err) {
    console.error(`Error while posting itineraries `, err.message);
    next(err);
  }
});

/* POST remove itinerary for a user */
router.post("/remove", async function (req, res, next) {
  try {
    res.json(await itineraries.remove(req.body));
  } catch (err) {
    console.error(`Error while posting itineraries `, err.message);
    next(err);
  }
});

module.exports = router;
