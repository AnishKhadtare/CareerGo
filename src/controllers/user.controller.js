import { User } from "../models/user.model.js";
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

export {userLogin, userRegister};