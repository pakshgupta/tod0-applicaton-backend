import { Router } from "express";
const router=Router();
import { Signincontroller, Signoutcontroller, Signupcontroller } from "../controllers/user.controller.js";
import { vaidateJWT } from "../middlewares/validateJWT.js";
router.route("/signup").post(Signupcontroller)
router.route("/signin").post(Signincontroller)
router.route("/signout").post(vaidateJWT, Signoutcontroller)
export default router