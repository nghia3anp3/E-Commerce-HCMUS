const mongoose = require("mongoose");

// Define main comment schema
const SubCommentSchema = mongoose.Schema({
    product_id: Number,
    type: String,
    sub_comment_id: Number,
    comment_id: Number,
    commentator: String,
    customer_id: Number,
    fullname: String,
    avatar_url: String,
    content: String,
    score: Number,
    created_at: Number,
    badge: String,
    status: Number,
    is_reported: Boolean,
  },
  {
    Timestamp: true,
  }
  );
  const SubComments = mongoose.model('sub_comments', SubCommentSchema);
  module.exports = SubComments;