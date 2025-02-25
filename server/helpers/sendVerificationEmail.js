const emailTemplate = require("./emailTemplate");
const transporter = require("./transporter");

const sendVerificationEmail = async (toEmail, verifyLink) => {
  try {
    const info = await transporter.sendMail({
      from: '"Akshay Sharma (ByteBookExchange)" <akshaysharma5432@gmail.com>',
      to: toEmail,
      subject: "Please verify your email",
      text: `Please verify your email by clicking this link: ${verifyLink}`,
      html: emailTemplate(verifyLink),
    });
    console.log(info);
  } catch (err) {
    console.error("Error in sendVerificationEmail:", err);
  }
};

const sendVerificationCode = async (verifyEmail, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Akshay Sharma (ByteBookExchange)" <akshaysharma5432@gmail.com>',
      to: verifyEmail,
      subject: "Your verification code",
      text: `Your verification code is ${verificationCode}`,
      html: emailTemplate(verificationCode),
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sendVerificationEmail, sendVerificationCode };
