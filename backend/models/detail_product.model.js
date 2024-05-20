const mongoose = require("mongoose");

const detail_productSchema = mongoose.Schema(
  {
    detail_product_id: Number,
    order_id: Number,
    product_id: Number,
    type: String,
    quantity: Number,
  },
  {
    Timestamp: true,
  }
);

const Detail_products = mongoose.model("detail_products", detail_productSchema);
module.exports = Detail_products;

