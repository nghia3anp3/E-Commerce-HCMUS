const express = require("express");
const laptopRouter = express.Router();
const commentsRoute = require("./comments.route.js");
const general_infoRoute = require("./general_info.js");
const spdRoute = require("./specific_data.js");

//Default
// phoneRouter.use("/", commentsRoute);
laptopRouter.get("/", (req, res) => {
    res.send("Hello from Node API Server");
  });

//Routes
// phoneRouter.use("/general_info", genral_infoRoute);
laptopRouter.use("/general_info", general_infoRoute);
laptopRouter.use("/comments", commentsRoute);
laptopRouter.use("/specific_data", spdRoute);
module.exports = laptopRouter;