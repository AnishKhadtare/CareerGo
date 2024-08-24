import {User} from "../models/user.model.js";
import { CandidateProfile } from "../models/candidateProfile.model.js";
import { RecruiterPostSchema } from "../models/recruiterPost.model.js";
import { AppliedJob } from "../models/candidateApplyJob.model.js";
import {uploadOnCloudinary} from "../cloudinary.js";

const candidateCreateProfile = async (req, res) => {
    try{
        const { 
            firstName, lastName, email,
            contactNumber, city, gender, candidateType,
            candidateTypeDescription, areaOfIntrest, 
            preferedJobType, preferedWorkMode,
            dateOfBirth, preferedLocations, education,
            profileSummary, allWorkExperience, projects,
            certification, acheivements,
        } = req.body;

        if(
            !firstName || !lastName || !email ||
            !contactNumber || !city || !gender || !candidateType ||
            !candidateTypeDescription || !areaOfIntrest || !preferedJobType ||
            !preferedWorkMode || !dateOfBirth || !preferedLocations || !education ||
            !profileSummary || !allWorkExperience || !projects || !certification ||
            !acheivements
        ){
            return res.status(400).json({message: "Please fill in all fields."});
        }
        
        const profilePhoto = req.file.profilePhoto;
        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
        const profilePhotoUrl = uploadedPhoto.secure_url;

        const emailAddress = req.user.email;

        const user = await User.find({emailAddress});

        if(!user){
            return res.status(400).json({message: "Email does not exists. Pls register to create profile"});
        }

        const userId = req.user._id; 
        
        const userProfileExists = await CandidateProfile.findOne({userId});

        if(userProfileExists){
            return res.status(400).json({message: "Profile is already created.", userProfileExists});
        }

        const createdProfile = await CandidateProfile.create({
            firstName, lastName, email, contactNumber, city,
            gender, candidateType, candidateTypeDescription,
            areaOfIntrest, preferedJobType, preferedWorkMode,
            dateOfBirth, preferedLocations, education,
            profileSummary, allWorkExperience, projects,
            certification, acheivements,
            userId : userId,
        });

        user.profilePhoto = profilePhotoUrl;
        await user.save();

        res.status(200).json({message : "Candidate profile created successfully", createdProfile});
    } 
    catch (error) {
        return res.status(400).json({message: `Error occurred during candidate profile creation : ${error.message}.`});
    }
}

const candidateUpdateProfile = async(req, res) => {
    try{
        const {
            firstName, lastName, email, contactNumber, city,
            gender, candidateType, candidateTypeDescription,
            areaOfIntrest, preferedJobType, preferedWorkMode,
            dateOfBirth, preferedLocations, education,
            profileSummary, allWorkExperience, projects,
            certification, acheivements,
        } = req.body;
        const userId = req.user._id;
        const userProfile = await CandidateProfile.findOne({userId});
        if(!userProfile){
            return res.status(400).json({message: "Profile does not exists. Please create profile"});
        }
        const updatedProfile = await CandidateProfile.updateOne({userId}, {
            $set: {
                firstName, lastName, email, contactNumber, city,
                gender, candidateType, candidateTypeDescription,
                areaOfIntrest, preferedJobType, preferedWorkMode,
                dateOfBirth, preferedLocations, education,
                profileSummary, allWorkExperience, projects,
                certification, acheivements,
            }
        });
        res.status(200).json({message : "Candidate profile updated successfully", updatedProfile});
    }
    catch (error) {
        return res.status(400).json({message: `Error occurred during candidate profile update : ${error.message}.`});
    }
}

const candidateGetProfile = async(req, res) => {
    try{
        const userId = req.user._id; 
        const userProfile = await CandidateProfile.findOne({userId});
        if(!userProfile){
            return res.status(400).json({message: "Profile does not exists."});
        }
        res.status(200).json({message : "Candidate profile fetched successfully", userProfile});
    }
    catch(error){
        return res.status(400).json({message: `Error occurred during candidate profile retrieval : ${error.message}.`});
    }
}

const getAllRecruitments = async(req, res) => {
    try {
        const recruitments = await RecruiterPostSchema.find();
        if(!recruitments){
            return res.status(404).json({message: "No recruitment post found."});
        }
        res.status(200).json({message : "Recruitment post found successfully", recruitments});
    }
    catch (error) {
        return res.status(400).json({message: `Error occurred during recruitment post retrieval : ${error.message}.`});
    }
}

const applyJob = async (req, res) => {
    try {
        const userId = req.user._id;
        const jobId = req.params.id;

        const isJobApplied = await AppliedJob.findOne({ userId, jobId });
        // if (isJobApplied) {
        //     return res.status(400).json({ message: "You have already applied for this job." });
        // }

        const job = await RecruiterPostSchema.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "No job found." });
        }

        const defaultAssesmentQuestions = ["Why should you be hired for this role?", "Confirm your availability"];
        const recruiterQuestions = job.assesmentQuestion || [];
        const assesmentQuestions = defaultAssesmentQuestions.concat(recruiterQuestions);

        if (!req.body.answers || assesmentQuestions.length !== req.body.answers.length) {
            return res.status(400).json({ message: "The number of answers provided does not match the number of assessment questions." });
        }

        const answers = req.body.answers;
        const resumeFile = req.file;

        const uploadedFile = await uploadOnCloudinary(resumeFile.path);
        console.log('Cloudinary Upload Response:', uploadedFile); // Log the entire response
        const resumeUrl = uploadedFile.secure_url;

        const appliedJob = new AppliedJob({
            userId,
            jobId,
            questions: assesmentQuestions,
            answers,
            resume: resumeUrl,
            status: 'Applied'
        });

        await appliedJob.save();

        return res.status(200).json({ message: "Job applied successfully with assessment responses.", appliedJob });
    } catch (error) {
        return res.status(500).json({ message: `Error occurred while applying for the job: ${error.message}` });
    }
};



const getAllAppliedJobs = async(req, res) => {
    try {
        const userId = req.user._id;
        const appliedJobs = await AppliedJob.find({userId});
        if(!appliedJobs){
            return res.status(404).json({message: "No job applied found."});
        }
        res.status(200).json({message : "Applied jobs found successfully", appliedJobs});
    }
    catch (error) {
        return res.status(400).json({message: `Error occurred during fetching applied jobs : ${error.message}.`});
    }
}

const getSingleJob = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await RecruiterPostSchema.findById(jobId);
        if(!job){
            return res.status(404).json({message: "No job found."});
        }
        res.status(200).json({message : "Job found successfully", job});
    }
    catch (error) {
        return res.status(400).json({message: `Error occurred during fetching info of single job : ${error.message}.`});
    }
}

export {
    candidateCreateProfile, candidateGetProfile, candidateUpdateProfile, getAllRecruitments,
    applyJob, getAllAppliedJobs, getSingleJob,
};