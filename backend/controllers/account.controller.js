const Account = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer =  require('nodemailer');
const generatePassword = require('generate-password');
// Load environment variables
require('dotenv').config();

const getAccount = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, 'your_secret_key', async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const userId = user.userId;
    try {
      const user = await Account.findOne({ _id: userId });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
    }
  });
};


const forgetPassword = async (req, res) => {
  const { account, email } = req.body;

  try {
      const user = await Account.findOne({ account: account });
      if (user) {
          if (user.email === email) {
              // Generate a new password or set it to a constant for now
              const newPassword = generatePassword.generate({
                length: 20,
                numbers: true,
                uppercase: true,
                strict: true
              });
              const hashedPassword = await bcrypt.hash(newPassword, 10);
              await Account.findOneAndUpdate({ account: account }, { password: hashedPassword });
              res.json("success");

              // Gửi mail
              const transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                      user: process.env.EMAIL_ADDRESS,
                      pass: process.env.EMAIL_PASSWORD
                  }
              });

              const mailOptions = {
                  from: process.env.EMAIL_ADDRESS,
                  to: email,
                  subject: 'Đổi mật khẩu',
                  text: `Mật khẩu mới của bạn là: ${newPassword}. Bạn vui lòng đổi mật khẩu để tăng tính bảo mật.`,
                  html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                          <h2 style="color: #333;">Đổi Mật Khẩu Thành Công</h2>
                          <p>Xin chào,</p>
                          <p>Mật khẩu mới của bạn là: <strong style="color: #d9534f;">${newPassword}</strong></p>
                          <p>Bạn vui lòng đổi mật khẩu để tăng tính bảo mật.</p>
                          <p>Trân trọng,</p>
                          <p><strong>TechAssist Mall</strong></p>
                          <hr style="border: 0; border-top: 1px solid #eee;">
                          <p style="font-size: 0.9em; color: #999;">Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng <a href="mailto:${process.env.EMAIL_ADDRESS}" style="color: #007bff;">liên hệ với chúng tôi</a>.</p>
                      </div>
                  </div>
                `,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.error('Error sending email:', error);
                  } else {
                      res.status(200).json("Correct email");
                      console.log('Email sent:', info.response);
                  }
              });
          } else {
              res.status(400).json("Email does not match account");
          }
      } else {
          res.status(404).json("User not found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("fail");
  }
};

const changePassword = async (req, res) => {
  const { account, password, new_password, confirm_newpassword } = req.body;
  try {
    const user = await Account.findOne({ account: account });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match && new_password === confirm_newpassword) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        const user_id = { _id: user.id };
        const update = { $set: { password: hashedPassword } };
        await Account.updateOne(user_id, update);
        res.status(200).json('Password changed successfully');
      } else {
        res.status(401).json("Invalid credentials");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("An error occurred");
  }
};

const update = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      const user = await Account.findOneAndUpdate({ user_id: user_id }, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedAccount = await Account.find({ user_id: user_id  });
      res.status(200).json(updatedAccount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAccount,
    forgetPassword,
    changePassword,
    update,
};

