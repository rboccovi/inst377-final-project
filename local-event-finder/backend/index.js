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

// ————— POST /api/favorites —————
// backend/index.js (POST /api/favorites handler)
app.post("/api/favorites", async (req, res) => {
  console.log("📥 POST /api/favorites body:", JSON.stringify(req.body));
  const { user_id, event_id } = req.body;

  try {
    // 1) Insert the row (no need to return everything here)
    const { error: insertError } = await supabase
      .from("favorites")
      .insert([req.body]);

    if (insertError) {
      console.error("❌ Supabase INSERT error:", insertError);
      return res.status(500).json({ error: insertError.message });
    }

    // 2) Query back the inserted row by its composite key
    const { data: rows, error: selectError } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user_id)
      .eq("event_id", event_id)
      .limit(1)
      .single(); // single() gives the first row or throws

    if (selectError) {
      console.error("❌ Supabase SELECT-after-insert error:", selectError);
      return res.status(500).json({ error: selectError.message });
    }

    console.log("✅ Inserted favorite (via re-select):", rows);
    return res.status(201).json(rows);
  } catch (err) {
    console.error("❌ Unexpected exception in POST /api/favorites:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ————— Start server —————
const port = process.env.PORT || 4000;
app.listen(port, "127.0.0.1", () => {
  console.log(`🚀 Backend listening on http://127.0.0.1:${port}`);
});
