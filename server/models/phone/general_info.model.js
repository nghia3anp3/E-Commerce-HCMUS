const mongoose = require("mongoose");

const general_infoSchema = mongoose.Schema(
  {
    id: Number,
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
  },
  {
    Timestamp: true,
  }
);

const General_Info = mongoose.model("dt_general_infos", general_infoSchema);
module.exports = General_Info;

