const express = require("express");
const commentRouter = express.Router();
const {getComments,getCommentByProductID,createComment,updateComment,deleteComment} = require('../../controllers/laptop/comments.controller.js');

//Get
commentRouter.get('/', getComments);
commentRouter.get("/:product_id", getCommentByProductID);
//Create comment
commentRouter.post("/", createComment);
// update a product
commentRouter.put("/:product_id", updateComment);
// delete a product
commentRouter.delete("/:product_id", deleteComment);

module.exports = commentRouter;