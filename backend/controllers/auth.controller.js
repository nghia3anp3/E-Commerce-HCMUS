const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer =  require('nodemailer');
const generatePassword = require('generate-password');
// Load environment variables
require('dotenv').config();

const login = async (req, res) => {
  // Handle POST requests for login
  const { account, password } = req.body;
  try {
    const user = await User.findOne({ account: account });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json("Invalid credentials");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("An error occurred");
  }
};

const register = async (req, res) => {
  const { user_id, account, password, email,  address, phone, role, avatar, avatarContentType} = req.body;
  
  try {
    const existingUser = await User.findOne({ account: account });
    if (existingUser) {
      res.json("exist");
    } else
    {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
      const newUser = {
        user_id: user_id,
        account: account,
        password: hashedPassword,
        email: email,
        address: address,
        role: role,
        phone: phone,
        avatar: avatar,
        avatarContentType: avatarContentType,
        cart: [],
      };
      await User.create(newUser);
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
};

  const reset_password = async (req, res) => {
    const { account, email } = req.body;

    try {
        const user = await User.findOne({ account: account });
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
                await User.findOneAndUpdate({ account: account }, { password: hashedPassword });
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
                            <p style="font-size: 0.9em; color: #999;">Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng <a href="mailto:${email}" style="color: #007bff;">liên hệ với chúng tôi</a>.</p>
                        </div>
                    </div>
                  `,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
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

const logout = (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const expiration = jwt.decode(token).exp; // Get token expiration time

  redisClient.set(token, "invalid", "EX", expiration - Math.floor(Date.now() / 1000), (err) => {
    if (err) {
      console.error("Redis set error:", err);
      return res.status(500).json("Internal server error");
    }
    res.status(200).json("Logged out successfully");
  });
};

module.exports = {
  login,
  register,
  reset_password,
  logout,
};