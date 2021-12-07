const express = require("express");
const authController = require("./authController");
const router = express.Router();
router.get("/user", authController.checkUser);
module.exports = router;
