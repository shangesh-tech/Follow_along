const ErrorHandler = require("../utils/ErrorHandler.js");
const UserModel = require("../model/user.model.js");
const transporter = require("../utils/sendmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config({
  path: "../config/env",
});

async function CreateUSer(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body)
  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler("User is already present in database", 400);

    return res.status(404).send({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  const newUser = new UserModel({
    name,
    email,
    password,
  });

  const data = {
    name,
    email,
    password,
  };

  const token = generateToken(data);

  await newUser.save();
  return res.send("User Created Successfully");
}

const generateToken = (data) => {
  // jwt
  const token = jwt.sign(
    { name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};
const verifyUser = (token) => {
  const verify = jwt.verify(token, process.env.SECRET_KEY);
  if (verify) {
    return verify;
  } else {
    return false;
  }
};

async function verifyUserController(req, res) {
  const { token } = req.params;
  try {
    if (verifyUser(token)) {
      return res
        .status(200)
        .cookie("token", token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: "token expired" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
}

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });
    if (checkUserPresentinDB) {
      return res.status(403).send({ message: "User already present" });
    }

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        if (err) {
          return res.status(403).send({ message: err.message });
        }
        await UserModel.create({
          Name: name,
          email,
          password: hashedPassword,
        });

        return res.status(201).send({ message: "User created successfully.." });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });

    //
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });

    bcrypt.compare(
      password,
      checkUserPresentinDB.password,
      function (err, result) {
        // result == true
        if (err) {
          return res.status(403).send({ message: er.message, success: false });
        }
        let data = {
          id: checkUserPresentinDB._id,
          email,
          password: checkUserPresentinDB.password,
        };
        const token = generateToken(data);

        return res
          .status(200)
          .cookie("token", token)
          .send({ message: "User logged in successfully..", success: true });
      }
    );

    // return saying signup first
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};
module.exports = {
  CreateUSer,
  login,
  verifyUserController,
  signup,
  verifyUser
};