import { Router } from "express";
import { candidateCreateProfile } from "../controllers/candidate.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create/profile").post(verifyUser, candidateCreateProfile);

export default router;