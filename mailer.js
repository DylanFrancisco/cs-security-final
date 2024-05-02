const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'passauth0@gmail.com',
    pass: 'hryg ntgy wqcp phfm' 
  }
});

function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { sendVerificationEmail };
