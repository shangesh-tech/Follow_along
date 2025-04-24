const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middlewares/jwt-verify.js");
const {
  CreateOrder,
  GetUserOrders,
} = require("../controllers/order.controller.js");
router.post("/confirmorder", verifyToken, CreateOrder);
router.get("/userordersdata", verifyUser, GetUserOrders);

module.exports = router;
