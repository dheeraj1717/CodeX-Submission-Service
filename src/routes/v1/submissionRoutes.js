const { createSubmission } = require("../../controllers/submissionController.js");
const rateLimitMiddleware = require("../../middlewares/rateLimitMiddleware.js");

async function submissionRoutes(fastify, options){
    fastify.post("/", { preHandler: [rateLimitMiddleware] }, createSubmission)
}

module.exports = submissionRoutes;