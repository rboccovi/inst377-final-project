// api/events.js
import axios from "axios";

export default async function handler(req, res) {
  const {
    city = "Boston",
    radius = "10",
    unit = "km",
    countryCode = "US",
  } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const tmRes = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          city,
          radius,
          unit,
          countryCode,
        },
        timeout: 5000,
      }
    );
    const events = tmRes.data._embedded?.events || [];
    return res.status(200).json(events);
  } catch (err) {
    console.error("❌ /api/events error:", err.message);
    return res.status(502).json({ error: err.message });
  }
}
