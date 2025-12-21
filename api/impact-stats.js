const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const stats = await redis.hgetall('impact-stats');
      return res.status(200).json(stats || { totalAnalyses: 0, totalRevenue: 0 });
    } catch (error) {
      return res.status(200).json({ totalAnalyses: 0, totalRevenue: 0 });
    }
  } else if (req.method === 'POST') {
    try {
      const { revenue } = req.body;
      await redis.hincrby('impact-stats', 'totalAnalyses', 1);
      await redis.hincrbyfloat('impact-stats', 'totalRevenue', parseFloat(revenue));
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to record analysis' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};
