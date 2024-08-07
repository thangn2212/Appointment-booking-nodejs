const nodemailer = require("nodemailer");
const HTML_TEMPLATE = require("../templates/registerEmail");

// Tạo transporter với thông tin tài khoản Gmail của bạn
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function send email
const sendRegistrationEmail = (recipientEmail, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Xác nhận tài khoản của bạn",
    html: HTML_TEMPLATE(`Mã xác nhận của bạn là: ${verificationCode}`),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};

module.exports = {
  sendRegistrationEmail,
};
