const fastify = require("fastify")({ logger: false });
const app = require("./app");
const connectDB = require("./config/dbConfig");

const port = process.env.PORT || 4002;

fastify.register(app);

fastify.listen({ port }, async (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // await connectDB();
    console.log(`Server listening on ${port}`);
});