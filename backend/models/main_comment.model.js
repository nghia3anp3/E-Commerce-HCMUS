const mongoose = require("mongoose");

// Define main comment schema
const MainCommentSchema = mongoose.Schema({
    product_id: Number,
    type: String,
    comment_id: Number,
    title: String,
    content: String,
    thank_count: Number,
    customer_id: Number,
    rating: Number,
    created_at: Number,
    customer_name: String,
    purchased_at: Number,
    sub_comments_id: Number,
  },
  {
    Timestamp: true,
  }
  );
  const MainComments = mongoose.model('comments', MainCommentSchema);
  module.exports = MainComments;