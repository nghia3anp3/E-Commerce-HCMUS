const express = require("express");
const accountController = require("../../controllers/user/account.controller.js");
const accountrouter = express.Router();

accountrouter.get('/', accountController.getAccount);
accountrouter.post("/forgetPassword", accountController.forgetPassword);
accountrouter.post("/changePassword", accountController.changePassword);


module.exports = accountrouter;