const redisConnection = require('../config/redisConfig');

/**
 * Token Bucket implementation using Redis Lua script for atomicity.
 * This ensures that the rate limiting logic is consistent even with concurrent requests.
 */

const LUA_SCRIPT = `
    local key = KEYS[1]
    local capacity = tonumber(ARGV[1])
    local refillRate = tonumber(ARGV[2]) -- tokens per millisecond
    local currentTime = tonumber(ARGV[3])

    local tokens
    local lastRefillTime

    -- Use EXISTS to safely detect a brand-new key.
    -- HMGET returns false (not nil) for missing fields in ioredis,
    -- so checking tonumber(data[1]) == nil is unreliable.
    if redis.call('EXISTS', key) == 0 then
        tokens = capacity
        lastRefillTime = currentTime
    else
        local data = redis.call('HMGET', key, 'tokens', 'lastRefillTime')
        tokens = tonumber(data[1])
        lastRefillTime = tonumber(data[2])
        local elapsed = currentTime - lastRefillTime
        tokens = math.min(capacity, tokens + (elapsed * refillRate))
        lastRefillTime = currentTime
    end

    if tokens >= 1 then
        tokens = tokens - 1
        redis.call('HMSET', key, 'tokens', tokens, 'lastRefillTime', lastRefillTime)
        redis.call('PEXPIRE', key, 600000) -- Expire after 10 minutes of inactivity
        return 1
    else
        redis.call('HMSET', key, 'tokens', tokens, 'lastRefillTime', lastRefillTime)
        redis.call('PEXPIRE', key, 600000)
        return 0
    end
`;

async function tryConsume(key, capacity, refillMs) {
    const refillRate = capacity / refillMs; // tokens per ms
    const currentTime = Date.now();

    const result = await redisConnection.eval(
        LUA_SCRIPT,
        1,
        key,
        capacity,
        refillRate,
        currentTime
    );

    return result === 1;
}

module.exports = {
    tryConsume
};
