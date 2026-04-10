const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 4002;
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379", 10);
const REDIS_HOST = process.env.REDIS_HOST || "[IP_ADDRESS]";
const LOG_DB_URI = process.env.LOG_DB_URI || "";
const NODE_ENV = process.env.NODE_ENV || "development";
const ATLAS_URI = process.env.ATLAS_URI || "";
const PROBLEM_ADMIN_SERVICE_URL = process.env.PROBLEM_ADMIN_SERVICE_URL || "http://localhost:4000";

module.exports = {
    PORT,
    REDIS_PORT,
    REDIS_HOST,
    LOG_DB_URI,
    NODE_ENV,
    ATLAS_URI,
    PROBLEM_ADMIN_SERVICE_URL,
    SUBMISSION_RATE_LIMIT_CAPACITY: parseInt(process.env.SUBMISSION_RATE_LIMIT_CAPACITY || "10", 10),
    SUBMISSION_RATE_LIMIT_REFILL_MS: parseInt(process.env.SUBMISSION_RATE_LIMIT_REFILL_MS || "60000", 10) // 1 minute
};
