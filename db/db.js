const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

async function initDB() {
  try {
    await client.connect();
    console.log("Successfully connected to Neon DB!");

    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id SERIAL PRIMARY KEY,
        aadhaar_number VARCHAR(12) NOT NULL,
        name_of_entrepreneur VARCHAR(255) NOT NULL,
        pan_number VARCHAR(10) NOT NULL,
        pan_name VARCHAR(255) NOT NULL,
        type_of_organization VARCHAR(255) NOT NULL,
        pin_code VARCHAR(6) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Table "form_submissions" ready.');
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

initDB();

module.exports = client;
