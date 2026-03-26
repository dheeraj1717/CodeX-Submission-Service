const submissionRoutes = require("./submissionRoutes");

async function v1Routes(fastify, options) {
    fastify.register(submissionRoutes, { prefix: "/submission" });
}

module.exports = v1Routes;