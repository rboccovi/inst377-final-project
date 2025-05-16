// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// These come straight from your .env (Vite exposes them via import.meta.env)
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
