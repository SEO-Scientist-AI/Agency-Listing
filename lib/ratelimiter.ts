import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

type RateLimitConfig = {
  enabled: boolean;
  ratelimit: Ratelimit | null;
};

// Add this helper function
function isSearchBot(userAgent: string) {
  const searchBots = [
    'Googlebot',
    'Bingbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot'
  ];
  return searchBots.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));
}

let ratelimitConfig: RateLimitConfig = {
  enabled: false,
  ratelimit: null,
};

if (process.env.UPSTASH_REDIS_REST_URL) {
  const redis = Redis.fromEnv();

  // Create a new ratelimiter with a higher limit to accommodate bots
  const ratelimitFunction = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "10 s"), // Increased limit
    analytics: true,
    enableProtection: true,
  });

  ratelimitConfig = {
    enabled: true,
    ratelimit: ratelimitFunction,
  };
} else {
  console.error("Environment variable UPSTASH_REDIS_REST_URL is not set.");
  ratelimitConfig = {
    enabled: false,
    ratelimit: null,
  };
}

export { ratelimitConfig, isSearchBot };
