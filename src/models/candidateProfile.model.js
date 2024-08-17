import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema({
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
    contactNumber : {
        countryCode:{
            type : Number,
            required : true,
        },
        number:{
            type : String,
            required : true,
        }
    },
    city : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
        enum : ["Male", "Female", "Others"],
    },
    candidateType : {
        type : String,
        required : true,
        enum : ["College student", "Fresher", "Working professional", "School Student"],
    },
    candidateTypeDescription : {
        collegeStudent : {
            stream : {
                type : String,
                required: function() { return this.candidateType === 'College student'; }
            },
            course : {
                type : String,
                required: function() { return this.candidateType === 'College student'; }
            },
            collegeName : {
                type : String,
                required: function() { return this.candidateType === 'College student'; }
            },
            startDate : {
                type : String,
                required: function() { return this.candidateType === 'College student'; }
            },
            endDate : {
                type : String,
                required: function() { return this.candidateType === 'College student'; }
            }
        },
        fresher : {
            stream : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            },
            course : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            },
            collegeName : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            },
            workExperience : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            },
            startDate : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            },
            endDate : {
                type : String,
                required: function() { return this.candidateType === 'Fresher'; }
            }
        },
        workingProfessional : {
            stream : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            },
            course : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            },
            collegeName : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            },
            workExperience : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            },
            startDate : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            },
            endDate : {
                type : String,
                required: function() { return this.candidateType === 'Working professional'; }
            }
        },
        schoolStudent : {
            standard : {
                type : String,
                required: function() { return this.candidateType === 'School Student'; }
            },
        },
    },
    areaOfIntrest: [{
        type : String,
        required: true,
    }],
    preferedJobType : {
        type : String,
        required : true,
        enum : ["Jobs", "Internships"],
    },
    preferedWorkMode: {
        type : String,
        required : true,
        enum : ["In-Office", "Work from home"],
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
},{timestamps : true,});

export const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema); 