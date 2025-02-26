const emailTemplate = (verificationCode) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Account</title>
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
      background: linear-gradient(135deg, #2f204e, #dd4c62);
      padding: 20px;
      border-radius: 8px 8px 0 0;
      color: #ffd700;
      font-size: 24px;
      font-weight: bold;
    }
    .code-box {
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
      word-break: break-word;
    }
    .button {
      display: inline-block;
      background-color: #dd4c62;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      box-shadow: 0 3px 10px rgba(221, 76, 98, 0.3);
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding: 15px;
      background: #2f204e;
      border-radius: 0 0 8px 8px;
      text-align: center;
      color: #ffd700;
      font-size: 12px;
    }
    .logo {
      width: 100px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Akshay Sharma (ByteBookExchange)</div>
    
    <p>Welcome to the community! 🎉</p>
    <p>Click the button below to verify your account and start exploring.</p>

    <!-- Verification Code Display -->
    <div class="code-box">${verificationCode}</div>

    <!-- Verify Button (No Copy Code) -->
    <a href="#" class="button">Verify My Account</a>

    <p style="margin-top: 20px;">
      ⭐ **Make sure to leave a review and share your thoughts!**  
      Your feedback helps us improve. 😊
    </p>

    <!-- Footer with Logo -->
    <div class="footer">
      <a href="https://akshaysharma.tech/">
        <img src="https://akshaysharma.tech/assets/brand_logo-CdvAONo1.png" alt="Akshay Sharma Logo" class="logo">
      </a>
      <p>&copy; ${new Date().getFullYear()} ByteBookExchange. All rights reserved.</p>
    </div>

  </div>
</body>
</html>
`;

module.exports = emailTemplate;
