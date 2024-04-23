const mongoose = require("mongoose");

// Define main comment schema
const CommentSchema = mongoose.Schema({
    product_id: Number,
    id_comment: Number,
    title: String,
    content: String,
    thank_count: Number,
    customer_id: Number,
    rating: Number,
    created_at: Number,
    customer_name: String,
    purchased_at: Number
  },
  {
    Timestamp: true,
  }
  );
  const Comments = mongoose.model('laptop_comments', CommentSchema);
  module.exports = Comments;