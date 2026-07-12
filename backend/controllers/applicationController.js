const applicationService = require("../services/applicationService");

// Apply for a Job
const applyJob = async (req, res) => {
    try {
        console.log("=== APPLY JOB REQUEST ===");
        console.log("Request body:", req.body);
        
        const { applicant_id, job_id } = req.body;
        
        console.log("applicant_id:", applicant_id);
        console.log("job_id:", job_id);
        console.log("Type of applicant_id:", typeof applicant_id);
        console.log("Type of job_id:", typeof job_id);
        
        if (!applicant_id || !job_id) {
            console.log("Missing fields!");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: applicant_id and job_id"
            });
        }
        
        console.log("Calling applicationService.applyJob...");
        const result = await applicationService.applyJob(applicant_id, job_id);
        console.log("Result from service:", result);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);

    } catch (error) {
        console.log("=== ERROR IN applyJob CONTROLLER ===");
        console.log("Error:", error);
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);

        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Get My Applications
const getMyApplications = async (req, res) => {
    try {

        const applicantId = req.params.applicantId;

        const result = await applicationService.getMyApplications(applicantId);

        res.json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    applyJob,
    getMyApplications
};