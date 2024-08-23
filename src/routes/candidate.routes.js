import { Router } from "express";
import {
    candidateCreateProfile, candidateGetProfile, candidateUpdateProfile, getAllRecruitments,
    applyJob, getAllAppliedJobs, getSingleJob,

} from "../controllers/candidate.controller.js";
import pdfUpload from "../middlewares/pdfUpload.middleware.js";
import imageUpload from "../middlewares/imageUpload.middleware.js";
import { verifyCandidate, verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create/profile").post(verifyUser, verifyCandidate, imageUpload.single('profilePhoto'), candidateCreateProfile);
router.route("/get/profile").get(verifyUser, verifyCandidate, candidateGetProfile);
router.route("/update/profile").post(verifyUser, verifyCandidate, candidateUpdateProfile);
router.route("/allRecruitments").get(verifyUser, verifyCandidate, getAllRecruitments);
router.route("/applyJob/:id").post(verifyUser, verifyCandidate, imageUpload.single('resume'),  applyJob);
router.route("/getAppliedJobs").get(verifyUser, verifyCandidate, getAllAppliedJobs);
router.route("/getSingleJob/:id").get(verifyUser, verifyCandidate, getSingleJob);

export default router;