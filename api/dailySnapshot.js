const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async function handler(req, res) {
  const timestamp = new Date().toISOString();
  console.log("=== DAILY SNAPSHOT STARTED ===");
  console.log("Timestamp:", timestamp);
  console.log("Request method:", req.method);
  
  try {
    console.log("Fetching stats from Redis...");
    const stats = await redis.hgetall("impact-stats");
    console.log("Retrieved stats:", stats);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
    console.log("Webhook URL exists:", !!webhookUrl);
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK environment variable not set");
      return res.status(500).send("Webhook URL not configured");
    }

    console.log("Sending webhook...");
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalUsers: stats.totalAnalyses || 0,
        totalRevenue: stats.totalRevenue || 0,
        totalVisitors: stats.totalVisitors || 0,
      }),
    });

    console.log("Webhook response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook failed:", errorText);
      return res.status(500).send("Webhook failed");
    }

    console.log("=== SNAPSHOT SUCCESS ===");
    res.status(200).send("Snapshot saved at " + timestamp);
  } catch (error) {
    console.error("=== SNAPSHOT FAILED ===");
    console.error("Error:", error);
    res.status(500).send("Snapshot failed: " + error.message);
  }
};
