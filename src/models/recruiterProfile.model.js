import mongoose from "mongoose";

const recruiterProfile = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    designation : {
        type : String,
        required : true,
    },
    countryCode : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },  
},{timestamps: true});

export const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfile);