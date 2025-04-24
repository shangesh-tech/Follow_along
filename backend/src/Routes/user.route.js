const express = require("express");
const multer = require("multer");

const {
  CreateUSer,
  verifyUserController,
  signup,
  login,
  getUSerData,
  AddAddressController,
  DeleteAddyController,
  GetAddressConroller,
} = require("../Controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const verifyUser = require("../Middlewares/jwt-verify.js");

const upload = multer({ dest: "temp-uploads/" });
const router = express.Router();

router.post("/create-user", upload.single("file"), CreateUSer);
router.get("/activation/:token", verifyUserController);


router.post("/signup", upload.single("file"), signup);
router.post("/login", login);
router.get("/userdata", verifyUser, getUSerData);
router.post("/addaddress", verifyUser, AddAddressController);
router.delete("/deleteaddress/:id", verifyUser, DeleteAddyController);
router.get("/getaddresses", verifyUser, GetAddressConroller);

module.exports = router;
