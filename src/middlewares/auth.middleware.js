import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
    try {
        console.log("Headers received:", req.headers); // Log headers
        const token = req.cookies?.accessToken;
        console.log("Access Token:", token); // Log the access token

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


export {verifyUser};