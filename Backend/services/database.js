const { Pool } = require("pg");
const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

const db = new Pool({
  host: DATABASE_URL,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
