import { createClient } from "redis";
import env from "./env.js";

const redis = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

redis.on("error", (err) => {
  console.error("Redis Error", err);
});

await redis.connect();

export default redis;