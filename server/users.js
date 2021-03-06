/* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/ */
const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  console.log("getting user: ", req)
  try {
    res.json(await users.get(req));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
  
});

router.get('/all_info', async function(req, res, next) {
  console.log("getting user info: ", req.body)
  try {
    res.json(await users.getAll(req));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
  
});

router.get('/token', async function(req, res, next) {
  console.log("getting user info: ", req.body)
  try {
    res.json(await users.getToken(req));
  } catch (err) {
    console.error(`Error while getting user token `, err.message);
    next(err);
  }
  
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  // console.log("posting user: ", req.body)
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while posting users `, err.message);
    next(err);
  }
});
router.post('/edit', async function(req, res, next) {
  console.log("editing user: ", req.body)
  try {
    res.json(await users.update(req.body));
  } catch (err) {
    console.error(`Error while posting users `, err.message);
    next(err);
  }
});

router.post('/remove', async function(req, res, next) {
  console.log("deleting user: ", req.body)
  try {
    res.json(await users.remove(req.body));
  } catch (err) {
    console.error(`Error while deleting users `, err.message);
    next(err);
  }
});

router.post('/changepassword', async function(req, res, next) {
  console.log("deleting user: ", req.body)
  try {
    res.json(await users.resetPassword(req.body));
  } catch (err) {
    console.error(`Error while changing password for user `, err.message);
    next(err);
  }
});

module.exports = router;