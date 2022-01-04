const express = require("express");
const router = express.Router();
const activities = require("../services/activities");

/* GET quotes listing. */
router.get("/favorite", async function (req, res, next) {
  console.log("getting favorite activities: ", req);
  //   res.send("hello world")
  try {
    res.json(await activities.getFavorites(req));
  } catch (err) {
    console.error(`Error while getting favorite activities `, err.message);
    next(err);
  }
});

router.get("/blacklist", async function (req, res, next) {
  console.log("getting blacklist activities: ", req);
  //   res.send("hello world")
  try {
    res.json(await activities.getBlacklist(req));
  } catch (err) {
    console.error(`Error while getting blacklist activities `, err.message);
    next(err);
  }
});

/* POST quotes */
router.post("/favorite", async function (req, res, next) {
  console.log("posting favorite activity: ", req.body);
  try {
    res.json(await activities.addFavorite(req.body));
  } catch (err) {
    console.error(`Error while posting favorite activity `, err.message);
    next(err);
  }
});

router.post("/blacklist", async function (req, res, next) {
  console.log("posting blacklist activity: ", req.body);
  try {
    res.json(await activities.addBlacklist(req.body));
  } catch (err) {
    console.error(`Error while posting blacklist activity `, err.message);
    next(err);
  }
});

router.post("/favorite/remove", async function (req, res, next) {
  console.log("posting favorite activity: ", req.body);
  try {
    res.json(await activities.removeBlacklist(req.body));
  } catch (err) {
    console.error(`Error while posting blacklist activity `, err.message);
    next(err);
  }
});

router.post("/blacklist/remove", async function (req, res, next) {
  console.log("posting blacklist activity: ", req.body);
  try {
    res.json(await activities.removeFavorite(req.body));
  } catch (err) {
    console.error(`Error while posting blacklist activity `, err.message);
    next(err);
  }
});

module.exports = router;
