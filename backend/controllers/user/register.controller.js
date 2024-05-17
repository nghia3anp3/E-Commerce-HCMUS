const User_info = require("../../models/user/info.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { account, password, email } = req.body;
  
  try {
    const existingUser = await User_info.findOne({ account: account });
    if (existingUser) {
      res.json("exist");
    } else {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
      const newUser = {
        account: account,
        password: hashedPassword,
        email: email,
      };
      await User_info.create(newUser);
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
};

module.exports = {
    register,
};
