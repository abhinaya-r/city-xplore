const express = require("express");
const authController = require("./authController");
const router = express.Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
module.exports = router;
