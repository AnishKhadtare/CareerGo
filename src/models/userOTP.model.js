import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
});

export const Otp = mongoose.model("Otp", otpSchema);