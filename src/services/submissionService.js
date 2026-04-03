const { fetchProblemDetails } = require("../apis/problemAdminApi");
const submissionQueueProducer = require("../producers/submissionQueueProducer");
class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  async pingCheck() {
    return "pong";
  }

  async addSubmission(submissionPayload) {
    // hit the problem admin service to get the problem details
    const problemId = submissionPayload.problemId;
    const problemAdminApiResponse = await fetchProblemDetails(problemId);
    if (!problemAdminApiResponse.success) {
      throw new Error(problemAdminApiResponse.message);
    }
    // find the language code stub
    const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(
      (codeStub) =>
        codeStub.language.toLowerCase() ===
        submissionPayload.language.toLowerCase(),
    );
    if (!languageCodeStub) {
      throw new Error("Language not supported");
    }
    // prepend the start snippet and append the end snippet to the submission code
    submissionPayload.code =
      languageCodeStub.startSnippet +
      "\n\n" +
      submissionPayload.code +
      "\n\n" +
      languageCodeStub.endSnippet;
    // create the submission
    const submission =
      await this.submissionRepository.createSubmission(submissionPayload);
    if (!submission) {
      throw new Error("Failed to create submission");
    }
    console.log(submission);
    const response = await submissionQueueProducer({
      [submission._id]: {
        code: submission.code,
        language: submission.language,
        inputCase: problemAdminApiResponse.data.testCases[0].input,
        outputCase: problemAdminApiResponse.data.testCases[0].output,
      },
    });
    return { queueResponse: response, submission: submission };
  }
}

module.exports = SubmissionService;
