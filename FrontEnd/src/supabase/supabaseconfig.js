import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://bxluhldahxrqbukrqcdy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bHVobGRhaHhycWJ1a3JxY2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NTM3MTYsImV4cCI6MjAzNTAyOTcxNn0.0fcUept_tAqKCks-TYp0gp_8kZPDzOMiLAN8JEijvXg")

export default supabase;