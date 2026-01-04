import Redis from "ioredis";

let redis: Redis | null = null;

try {
  let url = process.env.REDIS_URL?.trim();
  
  if (url) {
    // Handle cases where people accidentally copy 'redis-cli -u ...'
    if (url.includes("-u ")) {
      url = url.split("-u ")[1].trim();
    }

    redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
    
    redis.on("error", (err) => {
      console.warn("Redis connection error:", err.message);
    });
  } else {
    console.warn("REDIS_URL not found in environment variables.");
  }
} catch (error) {
  console.error("Failed to initialize Redis client:", error);
}

export default redis;
