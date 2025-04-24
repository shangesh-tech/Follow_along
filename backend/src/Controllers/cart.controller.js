const mongoose = require("mongoose");
const CartModel = require("../Model/cart.model.js");
const UserModel = require("../Model/user.model.js");

async function AddToCartController() {
  const { productId, quantity } = req.body;
  const userId = req.UserId;
  try {
    if (mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Send Valid Product ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Send Valid User ID" });
    }

    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res.status(401).send({ message: "Un-Authorized Please signup " });
    }

    const checkIfProductPresent = await CartModel.findOne({
      productId: productId,
    });
    if (checkIfProductPresent) {
      return res
        .status(400)
        .send({ message: "Product already present in Cart" });
    }

    await CartModel.create({
      productId,
      quantity,
      userId,
    });

    return res
      .status(201)
      .send({ message: "Product is successfully created", success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}

async function GetProductsForUser(req, res) {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Un-Authorized Please signup" });
    }
    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res.status(401).send({ message: "Un-Authorized Please signup" });
    }
    const data = await CartModel.find({ userId }).populate("productId");
    // const data = await CartModel.find({ userId });
    return res.status(200).send({
      message: "Data successfully fetched",
      success: true,
      cartData: data,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}
module.exports = { AddToCartController, GetProductsForUser };
