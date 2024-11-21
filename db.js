// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.epebnjmdwbgtaawtutfw:SitaRam@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres',
});

module.exports = pool;