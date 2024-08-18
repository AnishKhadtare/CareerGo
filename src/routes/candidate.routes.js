import { Router } from "express";
import { candidateCreateProfile } from "../controllers/candidate.controller.js";
import { verifyCandidate, verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create/profile").post(verifyUser, verifyCandidate, candidateCreateProfile);

export default router;