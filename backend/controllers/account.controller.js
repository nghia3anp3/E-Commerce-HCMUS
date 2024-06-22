const Account = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer =  require('nodemailer');
const fs = require('fs');
const path = require('path');
const generatePassword = require('generate-password');
// Load environment variables
require('dotenv').config();

const getAccount = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, '6f1c30a32c702daaca573d4cc8c6959a64ee27c189b87469e5da84764116c22caf1f13fc308cf2f354d135fbb653eeba2c17a8f26ac1abb9b90cb1f100387c432d6e7c2f35057634fa842d45c967ad3674ef923e2d9bce5b82d64d9cae5aea40587b727d64381d38594c181e206e8546b8066306f765eb0011eeab5d339d2a92eda713bb8c9d326d219a8e704db2200bbc3eff222087c8635994cfe144f4245d450fcd968a8a839948bbb4eaab54a66e1ceeff5296e76a5bbb5ddf7687dfe37f', async (err, user) => {
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
  const { account, password, new_password} = req.body;
  try {
    const user = await Account.findOne({ account: account });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
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

const changeEmail = async (req, res) => {
  const {account, editedEmail} = req.body
  try {
    const user = await Account.findOne({account: account})
    if (user){
      const user_id = { _id: user.id };
      const update = {$set: {email: editedEmail}}
      await Account.updateOne(user_id, update)
      res.status(200).json("Change email uccessfully")
    }
    else{
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("An error accurred")
  }
}

const changePhone = async (req, res) => {
  const {account, editedPhone} = req.body
  try {
    const user = await Account.findOne({account: account})
    if (user){
      const user_id = { _id: user.id };
      const update = {$set: {phone: editedPhone}}
      await Account.updateOne(user_id, update)
      res.status(200).json("Change phone successfully")
    }
    else{
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("An error accurred")
  }
}

const update = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      const avatarData = fs.readFileSync(req.file.path);
      const avatarContentType = req.file.mimetype;

      updatedData.avatar = avatarData;
      updatedData.avatarContentType = avatarContentType;

      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await Users.findOneAndUpdate(
      { user_id },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };

module.exports = {
    getAccount,
    forgetPassword,
    changePassword,
    changeEmail,
    changePhone,
    update,
};

