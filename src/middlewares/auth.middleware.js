import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({message: 'Unauthorized User. Token not found'});
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ _id: decodedToken._id });

        if (!user) {
            return res.status(400).json({
                message : "Invalid decoded token",
            });
        }

        req.user = user;
        next();  
    }
    catch (error) {
        return res.status(404).json({
            message : `Invalid user. Authentication Failed ! ERROR : ${error.message}`,
        });
    }
}

const verifyCandidate = async (req, res, next) => {
    try{
        const userRole = req.user.role;
        if(userRole !== 'Candidate'){
            return res.status(403).json({
                message : "Forbidden. Only Candidate can access this route",
            });
        }
        next();
    }
    catch(error){
        return res.status(404).json({
            message : `Invalid user. Authentication Failed in verifyCandidate middleware ! ERROR : ${error.message}`
        });
    }
}

const verifyRecruiter = async (req, res, next) => {
    try{
        const userRole = req.user.role;
        if(userRole !== 'Recruiter'){
            return res.status(403).json({
                message : "Forbidden. Only Recruiter can access this route",
            });
        }
        next();
    }
    catch(error){
        return res.status(404).json({
            message : `Invalid user. Authentication Failed in verifyRecruiter middleware ! ERROR : ${error.message}`
        });
    }
}

export {verifyUser, verifyCandidate, verifyRecruiter};