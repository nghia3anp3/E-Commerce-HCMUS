const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const token = jwt.sign({ userId: user._id }, '6f1c30a32c702daaca573d4cc8c6959a64ee27c189b87469e5da84764116c22caf1f13fc308cf2f354d135fbb653eeba2c17a8f26ac1abb9b90cb1f100387c432d6e7c2f35057634fa842d45c967ad3674ef923e2d9bce5b82d64d9cae5aea40587b727d64381d38594c181e206e8546b8066306f765eb0011eeab5d339d2a92eda713bb8c9d326d219a8e704db2200bbc3eff222087c8635994cfe144f4245d450fcd968a8a839948bbb4eaab54a66e1ceeff5296e76a5bbb5ddf7687dfe37f', { expiresIn: '1h' });
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
  logout,
};
