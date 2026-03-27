const fastify = require("fastify")({ logger: false });
const app = require("./app");
const connectDB = require("./config/dbConfig");

const { PORT } = require("./config/serverConfig");

fastify.register(app);

fastify.listen({ port: PORT }, async (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    await connectDB();
    console.log(`Server listening on ${PORT}`);
});