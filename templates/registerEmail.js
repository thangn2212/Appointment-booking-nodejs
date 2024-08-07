const EMAIL_VERIFICATION_TEMPLATE = (verificationCode) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
          .container {
            width: 100%;
            padding: 20px;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .email-body {
            padding: 20px;
            text-align: center;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
          }
          .verification-code {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            background-color: #f0f0f0;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>Xác Nhận Tài Khoản</h1>
            </div>
            <div class="email-body">
              <p>Cảm ơn bạn đã đăng ký tài khoản tại ứng dụng của chúng tôi. Để hoàn tất quá trình đăng ký, vui lòng nhập mã xác nhận dưới đây:</p>
              <div class="verification-code">
                ${verificationCode}
              </div>
              <p>Nếu bạn không yêu cầu xác nhận này, vui lòng bỏ qua email này.</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Appointment Booking App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
};

module.exports = EMAIL_VERIFICATION_TEMPLATE;
