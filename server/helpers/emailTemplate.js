const emailTemplate = (verificationCode) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Verification Code</title>
  <style>
    body {
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
      color: #333;
    }
    .container {
      background-color: #fff;
      max-width: 600px;
      margin: 20px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #2c3e50;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      color: #fff;
      font-size: 24px;
    }
    .code-box {
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
      word-break: break-all;
    }
    .button {
      display: inline-block;
      background-color: #2c3e50;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #7f8c8d;
    }
  </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2f204e, #dd4c62); padding: 15px; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffd700; margin: 0; font-size: 24px; font-weight: bold;">ByteBookExchange</h1>
    </div>

    <!-- Welcome Message -->
    <p style="color: #333; font-size: 18px; margin-top: 20px;">
      Welcome to the community! 🎉  
    </p>
    <p style="color: #555; font-size: 16px; margin: 10px 20px;">
      Click the button below to **verify your account** and start exploring.
    </p>

    <!-- Verification Button -->
    <a href="${verificationLink}" 
       style="display: inline-block; padding: 12px 24px; margin: 20px auto; background-color: #dd4c62; color: #fff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; box-shadow: 0 3px 10px rgba(221, 76, 98, 0.3);">
      Verify My Account
    </a>

    <!-- Review Reminder -->
    <p style="color: #444; font-size: 14px; margin-top: 20px;">
      ⭐ **Make sure to leave a review and share your thoughts!**  
      Your feedback helps us improve. 😊
    </p>

    <!-- Footer with Logo -->
    <div style="margin-top: 30px; padding: 15px; background: #2f204e; border-radius: 0 0 8px 8px; text-align: center;">
      <a href="https://akshaysharma.tech/">
        <img src="https://akshaysharma.tech/assets/brand_logo-CdvAONo1.png" alt="ByteBookExchange Logo" style="width: 100px; margin-bottom: 10px;">
      </a>
      <p style="color: #ffd700; font-size: 12px; margin: 5px 0;">
        &copy; ${new Date().getFullYear()} ByteBookExchange. All rights reserved.
      </p>
    </div>

  </div>
</body>


</html>
`;

module.exports = emailTemplate;
