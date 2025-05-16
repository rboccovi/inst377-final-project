// api/favorites.js
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service‐role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // GET /api/favorites
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("favorites").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    } catch (err) {
      console.error("❌ GET /api/favorites error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/favorites
  if (req.method === "POST") {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert([req.body], { returning: "representation" });
      if (error) throw error;

      // Always return JSON (the inserted row)
      return res.status(201).json(data[0] || {});
    } catch (err) {
      console.error("❌ POST /api/favorites error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
