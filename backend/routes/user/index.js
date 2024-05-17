const express = require("express");
const userRouter = express.Router();
const loginRoute = require("./login.route.js");
const registerRoute = require("./register.route.js");
const accountRoute = require("./account.route.js");

//Default
userRouter.get("/", (req, res) => {
    res.send("Hello from Node API Server");
  });

//Routes
userRouter.use("/login", loginRoute);
userRouter.use("/register", registerRoute);
userRouter.use("/account", accountRoute);
module.exports = userRouter;