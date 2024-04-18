import express from "express";
import specificDataRouter from "./specific_data.mjs";

const router = express.Router();

router.use("/specific_data", specificDataRouter);

router.use("/", (req, res, next) => {
    res.redirect("/laptop/specific_data");
});

export default router;