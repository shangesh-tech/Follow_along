const mongoose = require("mongoose");
const UserModel = require("../Model/user.model");
const CartModel = require("../Model/cart.model");

async function addToCartController(req, res) {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Send valid product id" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "Send valid user id", success: false });
    }

    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res
        .status(400)
        .send({ message: "unAuthorized get out !!", success: false });
    }

    const checkProductPresent = await CartModel.findOne({
      productId: productId,
    });
    if (checkProductPresent) {
      return res
        .status(400)
        .send({ message: "Already present in cart", success: false });
    }

    await CartModel.create({
      productId,
      quantity,
      userId,
    });

    return res
      .status(201)
      .send({ message: "Product created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "internal server error", err: error.message });
  }
}

async function getCartProductController(req, res) {
  const userId = req.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "unAuthorized user " });
    }

    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res.status(401).send({ message: "Un-Authorized Please signup" });
    }

    const data = await CartModel.find({ userId }).populate("productId");
    return res.status(200).send({
      message: "data successfully retrieved",
      success: true,
      cartData: data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
}

module.exports = { addToCartController, getCartProductController };
