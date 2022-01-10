/* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/ */
const express = require("express");
const router = express.Router();
const activities = require("../services/activities");

/* GET all favorite activities for a user. */
router.get("/favorite", async function (req, res, next) {
  try {
    res.json(await activities.getFavorites(req));
  } catch (err) {
    console.error(`Error while getting favorite activities `, err.message);
    next(err);
  }
});

/* GET all blacklisted activities for a user. */
router.get("/blacklist", async function (req, res, next) {
  try {
    res.json(await activities.getBlacklist(req));
  } catch (err) {
    console.error(`Error while getting blacklist activities `, err.message);
    next(err);
  }
});

/* POST new favorites activity for a user. */
router.post("/favorite", async function (req, res, next) {
  try {
    res.json(await activities.addFavorite(req.body));
  } catch (err) {
    console.error(`Error while posting favorite activity `, err.message);
    next(err);
  }
});

/* POST new blacklisted activity for a user. */
router.post("/blacklist", async function (req, res, next) {
  try {
    res.json(await activities.addBlacklist(req.body));
  } catch (err) {
    console.error(`Error while posting blacklist activity `, err.message);
    next(err);
  }
});

/* POST remove blacklisted activity for a user. */
router.post("/blacklist/remove", async function (req, res, next) {
  try {
    res.json(await activities.removeBlacklist(req.body));
  } catch (err) {
    console.error(`Error while posting blacklist activity `, err.message);
    next(err);
  }
});

/* POST remove favorited activity for a user. */
router.post("/favorite/remove", async function (req, res, next) {
  try {
    res.json(await activities.removeFavorite(req.body));
  } catch (err) {
    console.error(`Error while posting favorite activity `, err.message);
    next(err);
  }
});

module.exports = router;
