const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id for the submission is required"]
    },
    problemId: {
        type: String,
        required: [true, "Problem Id for the submission is required"]
    },
    language: {
        type: String,
        required: [true, "Language for the submission is required"]
    },
    code: {
        type: String,
        required: [true, "Code for the submission is required"]
    },
    status: {
        type: String,
        enum: ["PENDING", "RE", "TLE", "MLE", "WA", "CE", "AC"],
        default: "PENDING",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    testCaseResults: [{
        input: String,
        output: String,
        expected: String,
        status: String,
        error: String
    }]
});

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;