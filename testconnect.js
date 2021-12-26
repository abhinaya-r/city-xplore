const { Pool, Client } = require("pg");

const credentials = {
  user: "fsmzivjlddejrr",
  host: "ec2-52-1-115-6.compute-1.amazonaws.com",
  database: "db92h7c97fdltv",
  password: "d6d74ad663133593ff33634ad389630203d0b6844e2dbd303e6a7c08abbecc45",
  port: 5432,
};

// Connect with a connection pool.

async function poolDemo() {
    const isProduction = process.env.NODE_ENV === "production";
    const connectionString = `postgresql://${credentials['user']}:${credentials['password']}@${credentials['host']}:${credentials['port']}/${credentials['database']}`;

    const pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
//   const pool = new Pool(credentials, false);
  console.log("begin")
  console.log("pool: ", pool)
  try {
    const now = await pool.query("SELECT * FROM users;");
    console.log("now: ", now)
  }
  catch(err){
    console.log(err)
  }
  
  await pool.end();
  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  console.log("client: ", now)
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);
})();