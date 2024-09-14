import { Router } from "express";
const router=Router();
import { vaidateJWT } from "../middlewares/validateJWT.js";
import { createCategorycontroller } from "../controllers/category.controller.js";
router.route("/create").post(vaidateJWT,createCategorycontroller)
export default router