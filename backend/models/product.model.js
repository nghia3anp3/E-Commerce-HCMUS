const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_id: Number,
    type: String,
    name: String,
    sku: Number,
    short_description: String,
    price: Number,
    original_price: Number,
    discount: Number,
    discount_rate: Number,
    quantity_sold: String,
    review_count: Number,
    inventory_status: String,
    stock_item_qty: Number,
    stock_item_max_sale_qty: Number,
    brand_id: Number,
    brand_name: String,
    images: Array,
    comments_id: Array,
    specific_infos: Array,
  },
  {
    Timestamp: true,
  }
);

const Product = mongoose.model("product_information", productSchema);
module.exports = Product;

