const { Queue } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const { SUBMISSION_QUEUE } = require("../utils/constant");

module.exports = new Queue(SUBMISSION_QUEUE, { connection: redisConnection });