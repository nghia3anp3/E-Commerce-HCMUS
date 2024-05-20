const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    order_id: Number,
    customer_id: Number,
    date: Date,
    address: String,
    detail_product_ids: Array,
    status: String
  },
  {
    Timestamp: true,
  }
);

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;

