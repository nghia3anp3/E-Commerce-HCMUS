const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const { account, password, email,  address} = req.body;
    
    try {
      const existingUser = await User.findOne({ account: account });
      if (existingUser) {
        res.json("exist");
      } else {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
        const newUser = {
          account: account,
          password: hashedPassword,
          email: email,
          address: address,
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