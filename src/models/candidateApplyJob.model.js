import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    jobId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecruiterPostSchema',
    },
    status : {
        type: String,
        enum: ['Applied', 'In Review', 'Interview Scheduled', 'Offered', 'Rejected'],
        default: 'Applied',
    },
    questions : [{
        type: String,
    }],
    answers : [{
        type: String,
    }],
    resume : {
        type: String,
    },
});

export const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);