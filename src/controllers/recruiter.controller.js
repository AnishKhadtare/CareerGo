import {User} from "../models/user.model.js";
import { RecruiterProfile } from "../models/recruiterProfile.model.js";

const recruiterCreateProfile = async (req, res) => {
    try{
        const { 
            firstName, lastName, email,
            designation, countryCode, phone
        } = req.body;

        if(
            !firstName || !lastName || !email ||
            !designation || !countryCode || !phone
        ){
            return res.status(400).json({message: "Please fill in all fields."});
        }
        const emailAddress = req.user.email;

        const user = await User.find({emailAddress});

        if(!user){
            return res.status(400).json({message: "Email does not exists. Pls register to create profile"});
        }

        const userId = req.user._id; 
        
        const userProfileExists = await RecruiterProfile.findOne({userId});

        if(userProfileExists){
            return res.status(400).json({message: "Profile is already created.", userProfileExists});
        }

        const createdProfile = await RecruiterProfile.create({
            firstName, lastName, email, designation, 
            countryCode, phone, userId : userId,
        });

        res.status(200).json({message : "Recruiter profile created successfully", createdProfile});
    } 
    catch (error) {
        return res.status(400).json({message: `Error occurred during candidate profile creation : ${error.message}.`});
    }
}

export {recruiterCreateProfile};