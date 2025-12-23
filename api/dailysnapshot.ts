import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler() {
  const stats = await redis.hgetall("impact-stats");

  await fetch(process.env.GOOGLE_SHEETS_WEBHOOK!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      totalUsers: stats.totalUsers || 0,
      totalRevenue: stats.totalRevenue || 0,
    }),
  });

  return new Response("Snapshot saved");
}
