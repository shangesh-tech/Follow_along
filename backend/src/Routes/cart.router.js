const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify.js");
const {
  AddToCartController,
  GetProductsForUser,
} = require("../Controllers/cart.controller.js");
router.post("/addtocart", verifyUser, AddToCartController);
router.get("/getusercartdata", verifyUser, GetProductsForUser);

module.exports = router;
