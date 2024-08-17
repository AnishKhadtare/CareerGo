import { User } from "../models/user.model.js";
import { RecruiterProfile } from "../models/recruiterProfile.model.js";
import { RecruiterPostSchema } from "../models/recruiterPost.model.js";
import { CandidateProfile } from "../models/candidateProfile.model.js";

import bcrypt from "bcrypt";

const generateRefreshAccessToken = async (userId) => {
    const user = await User.findById(userId);

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    
    await user.save({validateBeforeSave : false});
    return { accessToken ,refreshToken };
}

const userLogin = async (req, res) => {
    try {
        const {role, email, password} = req.body;

        if(!role || !email || !password){
            return res.status(400).json({message: "Please fill in all fields."});
        } 
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found. Does not exist"});
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Incorrect password"});
        }

        if(role !== user.role){
            return res.status(400).json({message: `You have no account registered as a ${role}`});
        }

        const {accessToken, refreshToken} = await generateRefreshAccessToken(user._id);

        const options = {
            httpOnly : true,
            secure : false, 
            sameSite: 'Strict',
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);
        
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        return res.status(200)
            .json({user: loggedInUser, message: "Logged in successfully"});
    } 
    catch (error) {
        return res.status(400).json({
            message : `User Login Unsuccessful : ERROR : ${error.message}`,
        });
    }
}

const userRegister = async(req, res) => {
    try{
        const {email, password, firstName, lastName, role} = req.body;

        if(!email || !password || !firstName || !lastName || !role){
            return res.status(400).json({message: "Please fill in all fields."});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const candidate = await User.create({email, password: hashedPassword, firstName, lastName, role});

        res.status(200).json({message : "User registered Successfully", candidate});
    }
    catch(error){
        return res.status(400).json({message: `Error occurred during candidate registration : ${error.message}.`});
    }
}

const userLogout = async(req, res) => {
    try{
        await User.findByIdAndUpdate(req.user._id, {
            $set:{
                refreshToken : undefined,
            },
        },{new : true,});
        return res.status(200).json({
            message : "User Logout Successfully",
        });
    }
    catch(error){
        return res.status(400).json({message: `Error occurred during logout : ${error.message}`});
    }
}

const userAccountDelete = async(req, res) => {
    try{
        const user = req.user;
        const userId = req.user._id;
        if(user.role === "Recruiter"){
            await RecruiterProfile.deleteOne({ userId: userId });
            await RecruiterPostSchema.deleteMany({ userId: userId });
        }
        if(user.role === "Candidate"){
            await CandidateProfile.deleteOne({ userId: userId });
        }
        await User.findByIdAndDelete(userId);
    }
    catch(error){
        return res.status(400).json({message: `Error occurred during account deletion : ${error.message}`});
    }
}

const changePassword = async(req, res) => {
    try{
        const userId = req.user._id;
        const {oldPassword, newPassword, retypePassword} = req.body;
        if(!oldPassword || !newPassword || !retypePassword){
            return res.status(400).json({message: "Please fill all fields."});
        }
        if(newPassword !== retypePassword){
            return res.status(400).json({message: "Passwords do not match."});
        }
        const user = await User.findById(userId);
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if(!isValidPassword){
            return res.status(400).json({message: "Old password is incorrect."});
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set:{
                password : await bcrypt.hash(newPassword, 10),
            },
        });
        return res.status(200).json({message: "Password changed successfully.", updatedUser});
    }
    catch(error){
        return res.status(400).json({message: `Error occurred during password change : ${error.message}`});
    }
}

export {userLogin, userRegister, userLogout, userAccountDelete, changePassword};