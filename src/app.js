const fastifyPlugin = require("fastify-plugin");

async function app(fastify, options) {
    fastify.register(require("@fastify/cors"), {
        origin: "*",
    });

    // register test route
    fastify.register(require("./routes/api/apiRoutes"), { prefix: "/api" });
    fastify.register(require("./services/servicePlugin"));
}

module.exports = fastifyPlugin(app);