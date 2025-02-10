const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "Gautham@gmail.com",
    pass: "qosr crfk zfos kufr",
  },
});

module.exports = transporter;
