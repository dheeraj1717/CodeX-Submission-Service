const { Worker } = require("bullmq");
const axios = require("axios");
const redisConnection = require("../config/redisConfig");
const SubmissionRepository = require("../repository/submissionRepository");

const submissionRepository = new SubmissionRepository();

function evaluationWorker(queueName){
    console.log("Worker started for queue", queueName);
    const worker = new Worker(queueName, async (job) => {
        if(job.name === "EvaluationJob" || job.name === "EvaluationResultJob"){
            console.log("Job received", job.data);
            try {
                // Update submission status in db
                // Compute overall status based on test case results
                let finalStatus = "AC";
                if (job.data.status && job.data.status !== "SUCCESS") {
                    finalStatus = job.data.status; // e.g. CE if the whole job failed
                } else if (job.data.testCaseResults) {
                    const failingCase = job.data.testCaseResults.find(r => r.status !== "SUCCESS");
                    if (failingCase) {
                        finalStatus = failingCase.status === "ERROR" ? "RE" : failingCase.status;
                    }
                }

                // Update submission in db
                const submission = await submissionRepository.updateSubmission(job.data.submissionId, { 
                    status: finalStatus,
                    testCaseResults: job.data.testCaseResults 
                });
                console.log("Submission updated successfully", submission);

                // Notify frontend via socket service
                const response = await axios.post("http://localhost:4005/sendPayload", {
                    userId: job.data.userId,
                    payload: {
                        ...job.data,
                        status: finalStatus // Send the aggregate status
                    }
                });
                console.log("Response", response.data);
            } catch (error) {
                console.error("Error processing job:", error.message);
            }
        }
    },{
        connection: redisConnection
    });
    return worker;
}

module.exports = evaluationWorker;