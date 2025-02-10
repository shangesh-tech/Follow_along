const UserModel = require("../Model/user.model.js");
const ErrorHandler = require("../utilities/errorhandler.js");
const transporter = require("../utilities/Sendmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

require("dotenv").config({
  path: "../config/.env",
});

async function CreateUser(req, res) {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler("Already Present in DB", 400);

    return res.status(404).send({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });

  const data = {
    Name,
    email,
    password,
  };
  const token = generateToken(data);
  await transporter.sendMail({
    to: "jeevanhd1313@gmail.com",
    from: "jeevanhd1313@gmail.com",
    subject: "verification email from follow along project",
    text: "Text",
    html: `<h1>Hello world   http://localhost:5173/activation/${token} </h1>`,
  });

  await newUser.save();

  return res.send("User Created Successfully");
}

const generateToken = (data) => {
  const token = jwt.sign(
    { name: data.name, email: data.email, id: data.id },
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
    const checkUserPresentInDB = await UserModel.findOne({ email: email });
    if (checkUserPresentInDB) {
      return res.status(403).send({ message: "User already present" });
    }

    const imageAddress = await cloudinary.UploadStream.upload(req.file.path, {
      folder: "uploads",
    }).then((res) => {
      fs.unlinkSync(req.file.path);
      return res.url;
    });

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        if (err) {
          return res.status(403).send({ message: err.message });
        }
        await UserModel.create({
          Name: name,
          email,
          password: hashedPassword,
          avatar: {
            url: imageAddress,
            public_id: `${email}_public_id`,
          },
        });

        return res.status(201).send({ message: "User created successfully.." });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentInDB = await UserModel.findOne({ email: email });

    bcrypt.compare(
      password,
      checkUserPresentInDB.password,
      function (err, result) {
        if (err) {
          return res.status(403).send({ message: er.message, success: false });
        }
        let data = {
          id: checkUserPresentInDB._id,
          email,
          password: checkUserPresentInDB.password,
        };
        const token = generateToken(data);

        return res.status(200).cookie("token", token).send({
          message: "User logged in successfully..",
          success: true,
          token,
        });
      }
    );
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

const getUserData = async (req, res) => {
  const userId = req.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Invalid user id" });
    }

    const checkUserPresentInDB = await UserModel.findOne({ _id: userId });
    if (!checkUserPresentInDB) {
      return res.status(401).send({ message: "please Signup" });
    }

    res.status(200).send({ data: checkUserPresentInDB });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUserData,
};
