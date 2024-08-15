import { Router } from "express";
import { candidateCreateProfile, candidateLogin, candidateRegister } from "../controllers/candidate.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(candidateLogin);
router.route("/register").post(candidateRegister);
router.route("/create/profile").post(verifyUser, candidateCreateProfile);

export default router;