const jwt = require("jsonwebtoken");

if (process.env.NODE !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" });
}

const verifyUser = (req, res, next) => {
  const token = req.query;
  if (!token) {
    return res.status(404).send({
      message: "Send token over request",
    });
  }

  const data = jwt.verify(token, process.env.SECRET_KEY);
  req.userEmailAddress = data.email;
  req.UserId = data.id;

  next();
};

module.exports = verifyUser;
