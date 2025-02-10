const express = require("express");
const multer = require("multer");
const {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUserData,
} = require("../Controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const verifyUser = require("../Middlewares/jwt-verify.js");
const upload = multer({ dest: "temp-uploads/" });
const router = express.Router();

router.get("/activation/:token", verifyUserController);
router.get("/user-data", verifyUser, getUserData);

router.post("/create-user", upload.single("file"), CreateUser);
router.post("/signup", upload.single("file"), signup);
router.post("/login", login);

module.exports = router;
