const express = require("express");
const loginController = require("../../controllers/user/login.controller.js");
const loginrouter = express.Router();

loginrouter.post("/", loginController.login);

module.exports = loginrouter