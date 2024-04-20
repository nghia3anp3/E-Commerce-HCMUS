import express from "express";
import specificDataRouter from "./specific_data.mjs";
import generalInfoDataRouter from "./general_info.mjs";
const router = express.Router();

router.use("/specific_data", specificDataRouter);
router.use("/general_info", generalInfoDataRouter);

router.use("/", (req, res, next) => {
    res.redirect("/phone/specific_data");
});

export default router;