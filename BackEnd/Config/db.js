const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;