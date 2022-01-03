// const Pool = require("pg").Pool;


const { Pool, Client } = require("pg");

const credentials = {
  user: "fsmzivjlddejrr",
  host: "ec2-52-1-115-6.compute-1.amazonaws.com",
  database: "db92h7c97fdltv",
  password: "d6d74ad663133593ff33634ad389630203d0b6844e2dbd303e6a7c08abbecc45",
  port: 5432,
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
console.log("pool: ", pool);
module.exports = pool; 