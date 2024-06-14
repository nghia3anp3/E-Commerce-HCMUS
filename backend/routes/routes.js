const express = require("express");
const Router = express.Router();
const {login, register, reset_password, logout} = require('../controllers/auth.controller.js');
const {getAccount, forgetPassword, changePassword, update} = require('../controllers/account.controller.js');
const {getAllusers,getUser,deleteUser,updateUser, getAvatar, upload} = require('../controllers/user.controller.js');
const {getComments, getCommentByProductID, createComment, updateComment, deleteComment, getReplyComments} = require('../controllers/main_comment.controller.js');
const {getSubComments, getSubcommentbyID, createSubcomment,updateSubcomment, deleteSubcomment} = require('../controllers/sub_comment.controller.js');
const {getAll, getbyID, createOrder, updateOrder, deleteOrder} = require('../controllers/order.controller.js');
const {getAllDetailProduct, getDetailProductbyID, createDetailProduct, updateDetailProduct, deleteDetailProduct} = require('../controllers/detail_product.controller.js');
const {getAllInfo, getInfo, createInfo, updateInfo, deleteInfo,} = require('../controllers/product.controller.js');
const {getContext_semantic_search} = require('../controllers/search.controller.js');
Router.get("/", (req, res) => {
    res.send("Hello from Node API Server");
  });

// Auth Routes
Router.post("/login", login);
Router.post("/register", register);
Router.get("/logout", logout);
Router.post("/reset_password", reset_password)
Router.post("/search");

// Account Routes
Router.get("/account", getAccount);
Router.post("/account/forgetPassword", forgetPassword);
Router.post("/account/changePassword", changePassword);
Router.post("/account", update);

// User Routes
Router.get("/users/", getAllusers);
Router.get("/users/:user_id", getUser);
// Router.put("/users/:user_id", updateUser);
Router.delete("/users/:user_id", deleteUser);
Router.put('/users/:user_id', upload.single('avatar'), updateUser);
Router.get('/avatar/:user_id', getAvatar);

// Main_comment Routes
Router.get("/comments", getComments);
Router.get("/comments/:product_id", getCommentByProductID);
Router.post("/comments", createComment);
Router.put("/comments/:product_id", updateComment);
Router.delete("/comments/:product_id", deleteComment);

//AI Main route
Router.post("/comments/AI_auto_comments", getReplyComments);
Router.post("/semantic_seach", getContext_semantic_search);

// Sub_comment Routes
Router.get("/subcomments", getSubComments);
Router.get("/subcomments/:product_id", getSubcommentbyID);
Router.post("/subcomments", createSubcomment);
Router.put("/subcomments/:product_id", updateSubcomment);
Router.delete("/subcomments/:product_id", deleteSubcomment);

// Order Routes
Router.get("/orders", getAll);
Router.get("/orders/:order_id", getbyID);
Router.post("/orders", createOrder);
Router.put("/orders/:order_id", updateOrder);
Router.delete("/orders/:order_id", deleteOrder);

// Detail Product Routes
Router.get("/detailproducts", getAllDetailProduct);
Router.get("/detailproducts/:detail_product_id", getDetailProductbyID);
Router.post("/detailproducts", createDetailProduct);
Router.put("/detailproducts/:order_id", updateDetailProduct);
Router.delete("/detailproducts/:order_id", deleteDetailProduct);

// Product Routes
Router.get("/products", getAllInfo);
Router.get("/products/:product_id", getInfo);
Router.post("/products", createInfo);
Router.put("/products/:product_id", updateInfo);
Router.delete("/products/:product_id", deleteInfo);

// AI model 1 routes
// Send Image to user



module.exports = Router;