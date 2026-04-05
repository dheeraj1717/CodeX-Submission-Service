const submissionQueue = require("../queues/submissionQueue");

module.exports = async function (payload) {
    const response = await submissionQueue.add("SubmissionJob", payload);
    console.log("Successfully added a new job to the queue");
    return response;
}
