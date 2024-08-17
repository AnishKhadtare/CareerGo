import {User} from "../models/user.model.js";
import { CandidateProfile } from "../models/candidateProfile.model.js";

const candidateCreateProfile = async (req, res) => {
    try{
        const { 
            firstName, lastName, email,
            contactNumber, city, gender, candidateType,
            candidateTypeDescription, areaOfIntrest, 
            preferedJobType, preferedWorkMode 
        } = req.body;

        if(
            !firstName || !lastName || !email ||
            !contactNumber || !city || !gender || !candidateType ||
            !candidateTypeDescription || !areaOfIntrest || !preferedJobType ||
            !preferedWorkMode
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
            firstName, lastName, email,contactNumber, city,
            gender, candidateType, candidateTypeDescription,
            areaOfIntrest, preferedJobType, preferedWorkMode,
            userId : userId,
        });
        res.status(200).json({message : "Candidate profile created successfully", createdProfile});
    } 
    catch (error) {
        return res.status(400).json({message: `Error occurred during candidate profile creation : ${error.message}.`});
    }
}

export {candidateCreateProfile};