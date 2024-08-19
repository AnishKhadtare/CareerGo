import {User} from "../models/user.model.js";
import { CandidateProfile } from "../models/candidateProfile.model.js";

const candidateCreateProfile = async (req, res) => {
    try{
        const { 
            firstName, lastName, email,
            contactNumber, city, gender, candidateType,
            candidateTypeDescription, areaOfIntrest, 
            preferedJobType, preferedWorkMode,
            dateOfBirth, preferedLocations, education,
            profileSummary, allWorkExperience, projects,
            certification, acheivements
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

export {candidateCreateProfile, candidateGetProfile, candidateUpdateProfile};