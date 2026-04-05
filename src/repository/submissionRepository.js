const Submission = require("../models/submissionModel");

class SubmissionRepository {
    constructor(){
        this.submissionModel = Submission;
    }
    async createSubmission(submission){
        const response = await this.submissionModel.create(submission);
        return response;
    }

    async updateSubmission(submissionId, submission){
        const response = await this.submissionModel.findByIdAndUpdate(submissionId, submission, {new: true});
        return response;
    }
}

module.exports = SubmissionRepository;