const fastify = require("fastify")({ logger: false });
const app = require("./app");
const connectDB = require("./config/dbConfig");

const { PORT } = require("./config/serverConfig");
const { EVALUATION_QUEUE } = require("./utils/constant");
const logger = require("./config/loggerConfig");

fastify.register(app);

async function startServer() {
    try {
        await fastify.listen({ port: PORT });
        await connectDB();
        evaluationWorker(EVALUATION_QUEUE);
        logger.info(`Server listening on ${PORT}`);
    } catch (err) {
        logger.error(`Error starting server: ${err.message}`);
        process.exit(1);
    }
}

startServer();
