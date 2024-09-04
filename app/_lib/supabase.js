import { createClient } from "@supabase/supabase-js";

// 444. Setting Up Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
