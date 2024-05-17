const express = require("express");
const router = express.Router();
const {getAllInfos, getInfo, createInfo, updateInfo, deleteInfo} = require('../../controllers/laptop/general_info.controller.js');


router.get('/', getAllInfos);
router.get("/:id", getInfo);

router.post("/", createInfo);
// update a product
router.put("/:id", updateInfo);
// delete a product
router.delete("/:id", deleteInfo);


module.exports = router;