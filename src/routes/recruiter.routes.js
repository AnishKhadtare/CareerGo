import { Router } from "express";
import { verifyRecruiter, verifyUser } from "../middlewares/auth.middleware.js";
import {postRecruitment, getAllPostedRecruitmentByRecruiter, getAllCandidatesApplications} from "../controllers/recruiterPostRecruitment.controller.js"
import { recruiterCreateProfile, updateProfile } from "../controllers/recruiter.controller.js";

const router = Router();

router.route("/create/profile").post(verifyUser, verifyRecruiter, recruiterCreateProfile);
router.route("/update/profile").post(verifyUser, verifyRecruiter, updateProfile);
router.route("/post/recruitment").post(verifyUser, verifyRecruiter, postRecruitment);
router.route("/getAllPostedRecruitments").get(verifyUser, verifyRecruiter, getAllPostedRecruitmentByRecruiter);
router.route("/getCandidateApplication/:id").get(verifyUser, verifyRecruiter, getAllCandidatesApplications);



export default router;