import {User} from "../models/user.model.js";
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

const candidateLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
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

        const {accessToken, refreshToken} = await generateRefreshAccessToken(user._id);

        const options = {
            httpOnly : true,
            secure : false, // Set to true in production (HTTPS)
            sameSite: 'Strict',
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);
        
        console.log("Cookies set:", { accessToken, refreshToken }); // Log the cookies being set

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


const candidateRegister = async(req, res) => {
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

const candidateCreateProfile = async (req, res) => {
    try{
        const { 
            firstName, lastName, email, contactNumber, 
            city, gender, candidateType, candidateTypeDescription, 
            areaOfIntrest, preferedJobType, preferedWorkMode 
        } = req.body;

        if(
            !firstName, !lastName, !email, !contactNumber, 
            !city, !gender, !candidateType, !candidateTypeDescription, 
            !areaOfIntrest, !preferedJobType, !preferedWorkMode
        ){
            return res.status(400).json({message: "Please fill in all fields."});
        }

        const user = await User.find({email});

        if(!user){
            return res.status(400).json({message: "Email does not exists. Pls register to create profile"});
        }

        const userId = req.user._id; 

        const createdProfile = await CandidateProfile.create({
            firstName, lastName, email, contactNumber,
            city, gender, candidateType, candidateTypeDescription,
            areaOfIntrest, preferedJobType, preferedWorkMode,
            userId : userId,
        });
        res.status(200).json({message : "Candidate profile created successfully", createdProfile});
    } 
    catch (error) {
        return res.status(400).json({message: `Error occurred during candidate profile creation : ${error.message}.`});
    }
}

export {candidateLogin, candidateRegister, candidateCreateProfile};