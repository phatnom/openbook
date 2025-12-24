const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async function handler(req, res) {
  try {
    const stats = await redis.hgetall("impact-stats");

    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalUsers: stats.totalAnalyses || 0,
        totalRevenue: stats.totalRevenue || 0,
        totalVisitors: stats.totalVisitors || 0,
      }),
    });

    res.status(200).send("Snapshot saved");
  } catch (error) {
    console.error("Snapshot failed:", error);
    res.status(500).send("Snapshot failed");
  }
};
