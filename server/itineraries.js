const express = require('express');
const router = express.Router();
const itineraries = require("../services/itineraries");

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  console.log("hi")
  console.log("getting itineraries: ", req)
//   res.send("hello world")
  try {
    res.json(await itineraries.get(req));
  } catch (err) {
    console.error(`Error while getting itineraries `, err.message);
    next(err);
  }
  
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  console.log("posting itinerary: ", req.body)
  try {
    res.json(await itineraries.create(req.body));
  } catch (err) {
    console.error(`Error while posting itineraries `, err.message);
    next(err);
  }
});

module.exports = router;