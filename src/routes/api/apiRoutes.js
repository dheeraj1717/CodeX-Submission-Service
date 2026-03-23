const fastifyPlugin = require("fastify-plugin");

function apiPlugin(fastify, options){
    fastify.register(require("../test/testRoutes"), { prefix: "/test" });
}

module.exports = fastifyPlugin(apiPlugin);