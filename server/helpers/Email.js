const sendVerificationCode = async (verifyEmail, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"Akshay Sharma (ByteBookExchange)" <akshaysharma5432@gmail.com>',
      to: "akshaysharma581995@gmail.com", // use the dynamic recipient
      subject: "Please verify your email",
      text: "Hello world?",
      html: `<p>Thanks for signing up! Please verify your email by clicking the link below:</p>`,
    });
  } catch (err) {}
};
