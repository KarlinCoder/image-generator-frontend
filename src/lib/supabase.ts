import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rrcbgntzgyjtyernovqy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyY2JnbnR6Z3lqdHllcm5vdnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODgxMjAsImV4cCI6MjA2MTc2NDEyMH0.UAv5nChQAT5Nmou3xgcC4ILJPY5Jheg3ai9eLygaQEs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
