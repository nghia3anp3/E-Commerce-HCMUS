const User_info = require("../../models/user/info.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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
      const user = await User_info.findOne({ _id: userId });
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
    const user = await User_info.findOne({ account: account });
    if (user) {
      if (user.email === email) {
        const new_password = '1323'; // Temporary new password
        const hashedPassword = await bcrypt.hash(new_password, 10);
        const user_id = { _id: user.id };
        const update = { $set: { password: hashedPassword } };
        await User_info.updateOne(user_id, update);
        res.status(200).json("Correct email");
      } else {
        res.status(403).json("Wrong email");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("An error occurred");
  }
};

const changePassword = async (req, res) => {
  const { account, password, new_password, confirm_newpassword } = req.body;
  try {
    const user = await User_info.findOne({ account: account });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match && new_password === confirm_newpassword) {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        const user_id = { _id: user.id };
        const update = { $set: { password: hashedPassword } };
        await User_info.updateOne(user_id, update);
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

module.exports = {
    getAccount,
    forgetPassword,
    changePassword,
};

