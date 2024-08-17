import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { postRecruitment } from "../controllers/recruiter.controller.js";
const router = Router();

router.route("/post/recruitment").post(verifyUser, postRecruitment);

export default router;