import { Router } from "express";
import { userLogin, userLogout, userRegister, userAccountDelete, changePassword, verifyOtp } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.post('/verify-otp', verifyOtp);
router.route("/logout").post(verifyUser, userLogout);
router.route("/deleteAccount").post(verifyUser, userAccountDelete);
router.route("/changePassword").post(verifyUser, changePassword);

export default router;