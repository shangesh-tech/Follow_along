const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
    ],
    shippingAddress: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String },
      zipCode: { type: Number, required: true },
      addressType: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
