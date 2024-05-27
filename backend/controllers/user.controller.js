const Users = require("../models/user.model");


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
    const queryParams = req.query;
    if (Object.keys(req.body).length === 0) {
      const updateResult = await Users.updateMany(
        { user_id: user_id },
        { $set: req.body },
        { new: true }
      );
      // Fetch updated users
      const updatedUsers = await Users.find({ user_id: user_id });
      return res.status(200).json(updatedUsers);
    }
    // Create filter with user_id
    const filter = { user_id };
    // Add query parameters to filter if they exist
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    // Update multiple users based on filter
    const updateResult = await Users.updateMany(
      filter,
      { $set: req.body },
      { new: true }
    );
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "No users found matching the criteria" });
    }
    // Fetch updated users
    const updatedusers = await Users.find(filter);
    res.status(200).json(updatedusers);
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

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    getAllusers
};
