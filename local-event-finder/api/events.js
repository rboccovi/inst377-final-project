// backend/index.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// ————— Init Supabase client (service role key) —————
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ————— Express setup —————
console.log("🔄 Loading backend/index.js");
const app = express();
app.use(cors());
app.use(express.json());

// ————— Logging middleware —————
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.url}`);
  next();
});

// ————— Health check —————
app.get("/", (req, res) => {
  console.log("📥 GET /");
  res.send("OK");
});

// ————— GET /api/events (Ticketmaster proxy) —————
const TM_BASE = "https://app.ticketmaster.com/discovery/v2";
if (!process.env.TICKETMASTER_API_KEY) {
  console.error("❌ Missing TICKETMASTER_API_KEY in .env");
  process.exit(1);
}

app.get("/api/events", async (req, res) => {
  console.log("📥 GET /api/events query:", req.query);
  const {
    city = "Boston",
    radius = "10",
    unit = "km",
    countryCode = "US",
  } = req.query;
  try {
    const tmRes = await axios.get(`${TM_BASE}/events.json`, {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        city,
        radius,
        unit,
        countryCode,
      },
      timeout: 5000,
    });
    const events = tmRes.data._embedded?.events || [];
    console.log(`📤 Returning ${events.length} events`);
    return res.json(events);
  } catch (err) {
    console.error("❌ TM proxy error:", err.message);
    return res.status(502).json({ error: err.message });
  }
});

// ————— GET /api/favorites —————
app.get("/api/favorites", async (req, res) => {
  console.log("📥 GET /api/favorites");
  try {
    const { data, error } = await supabase.from("favorites").select("*");
    if (error) {
      console.error("❌ Supabase SELECT error:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    console.error("❌ Unexpected error in GET /api/favorites:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
