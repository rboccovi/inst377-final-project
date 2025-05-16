cat > (api / favorites.js) << "EOF";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("favorites").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { error } = await supabase.from("favorites").insert([req.body]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).end();
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end("Method Not Allowed");
  }
}
EOF;
