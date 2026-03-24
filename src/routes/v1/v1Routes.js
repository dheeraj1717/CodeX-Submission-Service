
async function v1Routes(fastify, options) {
    fastify.register(require("../test/testRoutes"), { prefix: "/test" });
}

module.exports = v1Routes;