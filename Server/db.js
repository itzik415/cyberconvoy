require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Please create an .env file in the server root directory with the variables i gave you.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
