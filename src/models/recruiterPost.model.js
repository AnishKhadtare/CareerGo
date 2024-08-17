import mongoose from "mongoose";

const recruiterPostSchema = new mongoose.Schema({
    isFreelancer: {
        type: Boolean,
        required: true,
    },
    personName: {
        type: String,
        required: function() { return this.isFreelancer; },
    },
    organizationName: {
        type: String,
        required: function() { return !this.isFreelancer; },
    },
    description : {
        type : String,
        required : true,
        minlength : 100,
    },
    city : {
        type : String,
        required : true,
    },
    industry : [{
        type : String,
        required : true,
    },],
    numberOfEmployees : {
        type: String,
        required: true,
    },
    isInternship : {
        type: Boolean,
        required: true,
    },
    internshipRole : {
        type : String,
        required : function () { return this.isInternship },
    },
    jobRole : {
        type : String,
        required : function () { return !this.isInternship },
    },
    requiredMinExperience : {
        type : String,
        required : function() { return !this.isInternship; },
    },
    requiredMaxExperience : {
        type : String,
        required : function() { return !this.isInternship; },
    },
    skillsRequired : [{
        type : String,
        required : function () { return (this.isInternship ||  !this.isInternship)},
    }],
    workType : {
        type : String,
        required : function () { return (this.isInternship ||  !this.isInternship)},
        enum : ["In-Office", "Hybrid", "Remote"],
    },
    workSchedule: {
        type : String,
        required : function () { return (this.isInternship ||  !this.isInternship) },
    },
    numberOfOpenings : {
        type : Number,
        required : function () { (this.isInternship ||  !this.isInternship) },
    },
    internshipCommencement : {
        type : String,
        enum : ["Immediately", "Later"],
        required : function () { return this.isInternship },
    },
    startDate : {
        type : String,
        required : function () { return this.isInternship && this.internshipCommencement === "Later"; },
    },
    internshipDuration : {
        type : Number,
        required : function () { return this.isInternship },
    },
    durationFormatType : {
        type : String,
        required : function () { return this.isInternship },
    },
    internshipResponsiblities : {
        type : String,
        required : function () { return this.isInternship },
    },
    jobDescription : {
        type : String,
        required : function () { return !this.isInternship },
    },
    whoCanApply : {
        type : String,
        required : function () { return (this.isInternship ||  !this.isInternship) },
    },
    stipendType:{
        type : String,
        required : function () { return this.isInternship },
        enum : ["Fixed", "Negotiable", "Performance based", "Unpaid"],
    },
    stipendCurrency: {
        type : String,
        required : function () { return this.isInternship },
    },
    stipendAmount: {
        type : Number,
        required : function () { return this.isInternship && ( this.stipendType != "Unpaid")},
    },
    maxLimitNegotiableStipend: {
        type : Number,
        required : function () { return this.isInternship && ( this.stipendType == "Negotiable")},
    },
    salaryCurrency : {
        type : String,
        required : function () { return !this.isInternship },
    },
    salaryMin : {
        type : String,
        required : function () { return !this.isInternship },
    },
    salaryMax : {
        type : String,
    },
    perks : {
        type : String,
        default : "None", 
    },
    isPrePlacementOfferAvailable : {
        type : Boolean,
    },
    assesmentQuestion : [{
        type : String,
    }],
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
},{timestamps : true,});

export const RecruiterPostSchema = mongoose.model("RecruiterPostSchema", recruiterPostSchema);