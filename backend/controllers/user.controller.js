const Users = require("../models/user.model");
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Multer setup
const upload = multer({ dest: 'uploads/' });

const getAllusers = async (req, res) => {
  try {
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const users = await Users.find({});
      return res.status(200).json(users);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch users from the database based on the constructed filter
    const users = await Users.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//By /:id + ?key=value
const getUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const queryParams = req.query; // JSON data from the request query
        if (Object.keys(queryParams).length == 0) {
            const user = await Users.find({ user_id });
            return res.status(200).json(user);
        }
        const filter = { user_id }; 
        
        Object.keys(queryParams).forEach(key => {
            filter[key] = queryParams[key];
        });
        const user = await Users.find(filter);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateUser = async (req, res) => {
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



const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await Users.findOneAndDelete({ user_id: user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Users.findOne({ user_id });

    if (user && user.avatar && user.avatarContentType) {
      res.set('Content-Type', user.avatarContentType);
      res.send(user.avatar);
    } else {
      res.status(404).send('Avatar not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching avatar');
  }
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    getAllusers,
    getAvatar,
    upload
};