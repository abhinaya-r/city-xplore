// const Pool = require("pg").Pool;
require('dotenv').config();
const { Pool, Client } = require("pg");
const credentials = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

// Connect with a connection pool.
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${credentials['user']}:${credentials['password']}@${credentials['host']}:${credentials['port']}/${credentials['database']}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
module.exports = pool; 