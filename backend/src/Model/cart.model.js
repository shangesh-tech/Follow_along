const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, require: true, ref: "User" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
