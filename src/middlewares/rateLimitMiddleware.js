const { tryConsume } = require('../utils/tokenBucket');
const { SUBMISSION_RATE_LIMIT_CAPACITY, SUBMISSION_RATE_LIMIT_REFILL_MS } = require('../config/serverConfig');

/**
 * Fastify middleware (preHandler hook) to enforce rate limiting on submissions.
 * It uses the Token Bucket algorithm with Redis storage.
 */
async function rateLimitMiddleware(request, reply) {
    const ip = request.ip;
    const key = `rate_limit:submission:${ip}`;

    const isAllowed = await tryConsume(
        key,
        SUBMISSION_RATE_LIMIT_CAPACITY,
        SUBMISSION_RATE_LIMIT_REFILL_MS
    );

    if (!isAllowed) {
        return reply.status(429).send({
            error: 'Too Many Requests',
            message: 'You have exceeded the rate limit for submissions. Please try again later.',
            limit: SUBMISSION_RATE_LIMIT_CAPACITY,
            refillInMs: SUBMISSION_RATE_LIMIT_REFILL_MS
        });
    }
}

module.exports = rateLimitMiddleware;
