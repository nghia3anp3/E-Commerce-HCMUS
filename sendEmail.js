// const nodemailer = require('nodemailer');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// require('dotenv').config()
// // Set your SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sendEmail = async () => {
//   // Create a transporter object using SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });
//   console.log(process.env.EMAIL_USER, ' ', process.env.EMAIL_PASSWORD)

//   // Send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'Group 4 - Pink Cat', // Sender address
//     to: 'lehuuhung30023010@gmail.com', // List of receivers
//     subject: 'Reset password', // Subject line
//     text: 'This is new password: 1111111. You should have change password.', // Plain text body
//     html: '<b>Hello,</b><p>This is new password: 1111111. You should have change password.</p>' // HTML body
//   });

//   console.log('Message sent: %s', info.messageId);
// }

// sendEmail().catch(console.error);
