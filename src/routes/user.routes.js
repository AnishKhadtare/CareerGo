import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);

export default router;