const DetailProduct = require("../models/detail_product.model");

const getAllDetailProduct = async (req, res) => {
  try {
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length === 0) {
      const detailProducts = await DetailProduct.find({});
      return res.status(200).json(detailProducts);
    }
    const filter = {};
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    const detailProducts = await DetailProduct.find(filter);
    res.status(200).json(detailProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetailProductbyID = async (req, res) => {
  try {
    const { detail_product_id } = req.params;
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length === 0) {
      const detailProduct = await DetailProduct.findOne({ detail_product_id });
      return res.status(200).json(detailProduct);
    }
    const filter = { detail_product_id }; // Start with the base filter containing detail_product_id
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    const detailProduct = await DetailProduct.find(filter);
    res.status(200).json(detailProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDetailProduct = async (req, res) => {
  try {
    const detailProduct = await DetailProduct.create(req.body);
    res.status(200).json(detailProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDetailProduct = async (req, res) => {
  try {
    const { detail_product_id } = req.params;
    const detailProduct = await DetailProduct.findOneAndUpdate({ detail_product_id }, req.body, { new: true });

    if (!detailProduct) {
      return res.status(404).json({ message: "Detail product not found" });
    }

    res.status(200).json(detailProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDetailProduct = async (req, res) => {
  try {
    const { detail_product_id } = req.params;
    const detailProduct = await DetailProduct.findOneAndDelete({ detail_product_id });

    if (!detailProduct) {
      return res.status(404).json({ message: "Detail product not found" });
    }
    res.status(200).json({ message: "Detail product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDetailProduct,
  getDetailProductbyID,
  createDetailProduct,
  updateDetailProduct,
  deleteDetailProduct,
};
