import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {postRecruitment} from "../controllers/recruiterPostRecruitment.controller.js"
import { recruiterCreateProfile, updateProfile } from "../controllers/recruiter.controller.js";

const router = Router();

router.route("/create/profile").post(verifyUser, recruiterCreateProfile);
router.route("/update/profile").post(verifyUser, updateProfile);
router.route("/post/recruitment").post(verifyUser, postRecruitment);

export default router;