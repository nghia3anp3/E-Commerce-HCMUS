const express = require("express");
const registerController = require("../../controllers/user/register.controller.js");
const registerrouter = express.Router();

registerrouter.post("/", registerController.register);

module.exports = registerrouter;