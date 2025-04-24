const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'jupitersorbeet@gmail.com',
    pass: 'hptb ipob uxvk ttfq',
  },
});

module.exports = transporter;