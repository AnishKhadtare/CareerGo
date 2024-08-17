import { RecruiterPostSchema } from "../models/recruiterPost.model.js";

const postRecruitment = async(req, res) => {
    try {
        const{
            isFreelancer, personName, organizationName, description, city, industry, numberOfEmployees,
            isInternship, internshipRole, jobRole, requiredMinExperience, requiredMaxExperience,
            skillsRequired, workType, workSchedule, numberOfOpenings, internshipCommencement, 
            startDate, internshipDuration, durationFormatType,internshipResponsiblities,
            jobDescription, whoCanApply, stipendType, stipendCurrency, stipendAmount, 
            maxLimitNegotiableStipend, salaryCurrency, salaryMin, salaryMax, perks,
            isPrePlacementOfferAvailable, assesmentQuestion
        } = req.body;

        const user = req.user;

        const recruitmentPostExists =  await RecruiterPostSchema.findOne({
            $or:[
                {internshipRole},
                {jobRole},
            ],                
            skillsRequired,
        })

        if(recruitmentPostExists){
            return res.status(400).json({message: "Recruitment post already exists."});
        }
    
        const postedRecruitment = await RecruiterPostSchema.create({
            isFreelancer, personName, organizationName, description, city, industry, numberOfEmployees,
            isInternship, internshipRole, jobRole, requiredMinExperience, requiredMaxExperience,
            skillsRequired, workType, workSchedule, numberOfOpenings, internshipCommencement,
            startDate, internshipDuration, durationFormatType,internshipResponsiblities,
            jobDescription, whoCanApply, stipendType, stipendCurrency, stipendAmount,
            maxLimitNegotiableStipend, salaryCurrency, salaryMin, salaryMax, perks,
            isPrePlacementOfferAvailable, assesmentQuestion, userId : user._id
        });

        if(!postedRecruitment){
            return res.status(400).json({message: "Failed to post recruitment"})
        }
        res.status(200).json({message : "Recruitment post created successfully", postedRecruitment});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {postRecruitment};