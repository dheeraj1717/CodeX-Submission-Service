const submissionQueueProducer = require("../producers/submissionQueueProducer");
class SubmissionService {
    constructor(submissionRepository){
        this.submissionRepository = submissionRepository;
    }
    async pingCheck(){
        return 'pong';
    }

    async addSubmission(submissionPayload){
       const submission = await this.submissionRepository.createSubmission(submissionPayload);
       if(!submission){
        throw new Error("Failed to create submission");
       }
       console.log(submission);
       const response = await submissionQueueProducer(submission);
       return {queueResponse:response, submission:submission};
    }
}

module.exports = SubmissionService;