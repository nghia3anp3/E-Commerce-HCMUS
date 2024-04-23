const express = require("express");
const router = express.Router();
const {getAllInfos, getinfo, createInfo, updateInfo, deleteInfo} = require('../../controllers/phone/general_info.controller.js');


router.get('/', getAllInfos);
router.get("/:id", getinfo);

router.post("/", createInfo);
// update a product
router.put("/:id", updateInfo);
// delete a product
router.delete("/:id", deleteInfo);


module.exports = router;