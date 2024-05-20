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
    const product = await Products.findOneAndUpdate({ product_id: product_id }, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedproduct = await Products.find({ product_id: product_id  });
    res.status(200).json(updatedproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInfo = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Products.findOneAndDelete({ product_id: product_id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
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
