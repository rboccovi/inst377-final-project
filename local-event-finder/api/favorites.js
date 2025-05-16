// api/favorites.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("favorites").select("*");
    if (error) {
      console.error("GET /api/favorites error:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const payload = req.body;
    const { data, error } = await supabase
      .from("favorites")
      .insert([payload], { returning: "representation" });

    if (error) {
      console.error("POST /api/favorites error:", error);
      return res.status(500).json({ error: error.message });
    }
    // Always return JSON
    return res.status(201).json(data[0]);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
