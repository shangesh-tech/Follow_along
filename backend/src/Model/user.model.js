const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, require: [true, "Enter the Name"] },
    email: {
      type: String,
      require: [true, "Enter Email id"],
      unique: [true, "Enter Unique Email id"],
    },
    password: { type: String, require: [true, "Enter the password"] },
    address: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        add1: {
          type: String,
        },
        add2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],
    role: { type: String, default: "user" },
    avatar: {
      url: { type: String, require: true },
      public_id: { type: String, require: true },
    },
    resetPaswordToken: String,
    resetPasswordTime: Date,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;