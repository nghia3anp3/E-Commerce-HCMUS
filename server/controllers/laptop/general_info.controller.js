const General_Info = require("../../models/laptop/general_info.model");

const getAllInfos = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const general_info = await General_Info.find({});
      return res.status(200).json(general_info);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const general_info = await General_Info.find(filter);
    res.json(general_info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInfo = async (req, res) => {
  try {
    const { id } = req.params;
    //Take after ?    
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
        const general_info = await General_Info.find({ id });
        return res.status(200).json(general_info);
    }
    const filter = { id }; // Start with the base filter containing product_id
    
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    const general_info = await General_Info.find(filter);
    res.status(200).json(general_info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInfo = async (req, res) => {
  try {
    const general_info = await General_Info.create(req.body);
    res.status(200).json(general_info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const general_info = await General_Info.findOneAndUpdate({ id: id }, req.body);

    if (!general_info) {
      return res.status(404).json({ message: "Info not found" });
    }

    const updatedInfo = await General_Info.find({ id: id  });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const general_info = await General_Info.findOneAndDelete({ id: id });

    if (!general_info) {
      return res.status(404).json({ message: "Info not found" });
    }
    res.status(200).json({ message: "Info deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInfos,
  getInfo,
  createInfo,
  updateInfo,
  deleteInfo,
};
