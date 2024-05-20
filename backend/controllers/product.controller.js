const Products = require("../models/product.model");

const getAllInfo = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const products = await Products.find({});
      return res.status(200).json(products);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const products = await Products.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInfo = async (req, res) => {
  try {
    const { product_id } = req.params;
    //Take after ?    
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
        const product = await Products.find({ product_id });
        return res.status(200).json(product);
    }
    const filter = { product_id }; // Start with the base filter containing product_id
    
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    const product = await Products.find(filter);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInfo = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { product_id } = req.params;
    const queryParams = req.query;
    if (Object.keys(req.body).length === 0) {
      const updateResult = await Products.updateMany(
        { product_id: product_id },
        { $set: req.body },
        { new: true }
      );
      // Fetch updated Products
      const updatedProducts = await Products.find({ product_id: product_id });
      return res.status(200).json(updatedProducts);
    }
    // Create filter with product_id
    const filter = { product_id };
    // Add query parameters to filter if they exist
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    // Update multiple Products based on filter
    const updateResult = await Products.updateMany(
      filter,
      { $set: req.body },
      { new: true }
    );
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "No Products found matching the criteria" });
    }
    // Fetch updated Products
    const updatedProducts = await Products.find(filter);
    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInfo = async (req, res) => {
  try {
    const { product_id } = req.params;
    const queryParams = req.query;
    // Create filter with product_id
    const filter = { product_id };
    // Add query parameters to filter if they exist
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    // Delete multiple Products based on filter
    const deleteResult = await Products.deleteMany(filter);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "No Products found matching the criteria" });
    }
    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInfo,
  getInfo,
  createInfo,
  updateInfo,
  deleteInfo,
};
