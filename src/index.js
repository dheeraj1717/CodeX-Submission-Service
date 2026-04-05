const fastify = require("fastify")({ logger: false });
const app = require("./app");
const connectDB = require("./config/dbConfig");

const { PORT } = require("./config/serverConfig");
const { EVALUATION_QUEUE } = require("./utils/constant");
const evaluationWorker = require("./workers/evaluationWorker");

fastify.register(app);

async function startServer() {
    try {
        await fastify.listen({ port: PORT });
        await connectDB();
        evaluationWorker(EVALUATION_QUEUE);
        console.log(`Server listening on ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();
