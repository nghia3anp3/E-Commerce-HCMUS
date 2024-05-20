const Orders = require("../models/order.model");

const getAll = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const orders = await Orders.find({});
      return res.status(200).json(orders);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const orders = await Orders.find(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getbyID = async (req, res) => {
  try {
    const { order_id } = req.params;
    //Take after ?    
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
        const order = await Orders.find({ order_id });
        return res.status(200).json(order);
    }
    const filter = { order_id }; // Start with the base filter containing order_id
    
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    const order = await Orders.find(filter);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Orders.findOneAndUpdate({ order_id: order_id }, req.body);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const updatedorder = await Orders.find({ order_id: order_id  });
    res.status(200).json(updatedorder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await Orders.findOneAndDelete({ order_id: order_id });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getbyID,
  createOrder,
  updateOrder,
  deleteOrder,
};
