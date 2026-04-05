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
                const finalStatus = job.data.status === "SUCCESS" ? "AC" : (job.data.status || "WA");
                const submission = await submissionRepository.updateSubmission(job.data.submissionId, { status: finalStatus });
                console.log("Submission updated successfully", submission);

                // Notify other services
                const response = await axios.post("http://localhost:4005/sendPayload", job.data);
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