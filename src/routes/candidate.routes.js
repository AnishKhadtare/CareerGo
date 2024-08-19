import { Router } from "express";
import { candidateCreateProfile, candidateGetProfile, candidateUpdateProfile } from "../controllers/candidate.controller.js";
import { verifyCandidate, verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create/profile").post(verifyUser, verifyCandidate, candidateCreateProfile);
router.route("/get/profile").get(verifyUser, verifyCandidate, candidateGetProfile);
router.route("/update/profile").post(verifyUser, verifyCandidate, candidateUpdateProfile);

export default router;