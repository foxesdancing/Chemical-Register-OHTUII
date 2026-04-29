

const client = supabase.createClient(
  // Insert your supabase API URL
  "https://algzsbuadwzjrkylywqd.supabase.co",
  // Insert here supabase anon key
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ3pzYnVhZHd6anJreWx5d3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTQ2MzYsImV4cCI6MjA4NjQ3MDYzNn0.3s3Zp99Fb4bGnoyXIOY8KvAHg_dosOVTz6txTFEWR3o"
);

window.supabase = client;
