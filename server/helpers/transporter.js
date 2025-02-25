// transporter.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "akshaysharma5432@gmail.com",
    pass: "nyoj yzdi npqs hxzc",
  },
});

module.exports = transporter;
