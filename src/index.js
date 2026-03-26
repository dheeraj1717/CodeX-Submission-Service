const fastify = require("fastify")({ logger: false });
const app = require("./app");

const port = process.env.PORT || 4002;

fastify.register(app);

fastify.listen({ port }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${port}`);
});