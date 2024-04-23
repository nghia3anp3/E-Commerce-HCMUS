const express = require("express");
const phoneRouter = express.Router();
const commentsRoute = require("./comments.route.js");
const general_infoRoute = require("./general_info.js");
const spdRoute = require("./specific_data.js");


//Default
// phoneRouter.use("/", commentsRoute);
phoneRouter.get("/", (req, res) => {
    res.send("Hello from Node API Server");
  });

//Routes
phoneRouter.use("/general_info", general_infoRoute);
phoneRouter.use("/comments", commentsRoute);
phoneRouter.use("/specific_data", spdRoute);
module.exports = phoneRouter;