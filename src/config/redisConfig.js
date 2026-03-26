const Redis = require('ioredis');
const { REDIS_PORT, REDIS_HOST } = require('./serverConfig');

const redisConfig = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    maxRetriesPerRequest: null
}

const redisConnection = new Redis(redisConfig);
module.exports = redisConnection;