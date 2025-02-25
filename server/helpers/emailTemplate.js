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
<body>
  <div class="container">
    <div class="header">ByteBookExchange</div>
    <p>Your verification code is:</p>
    <div class="code-box">${verificationCode}</div>
    <a href="#" class="button">Copy Code</a>
    <p style="margin-top: 10px;">Copy the above code and paste it in the verification field on our website.</p>
    <div class="footer">&copy; ${new Date().getFullYear()} ByteBookExchange. All rights reserved.</div>
  </div>
</body>
</html>
`;

module.exports = emailTemplate;
