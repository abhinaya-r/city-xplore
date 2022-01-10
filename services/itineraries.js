// https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial
const db = require("./db");


async function create(itinerary) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    itinerary.token,
  ]);
  let user_id = user[0].user_id;
  const result = await db.query(
    "INSERT INTO itineraries(user_id, itinerary, date) VALUES ($1, $2, $3) RETURNING *",
    [user_id, itinerary.itinerary, itinerary.date]
  );

  let message = "Error in creating itinerary";
  if (result.length) {
    message = "Itinerary created successfully";
  }
  console.log("message:", message);
  return { message };
}

async function get(token) {
  const getToken = token.query.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  let user_id = user[0].user_id;

  const result = await db.query(
    "SELECT * FROM itineraries WHERE user_id = $1",
    [user_id]
  );
  let message = "Error in getting itineraries";
  if (result.length) {
    message = "Got itineraries successfully";
    return result;
  }
  return null;
}

async function remove(itinerary) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    itinerary.token,
  ]);
  let user_id = user[0].user_id;
  const result = await db.query(
    "DELETE FROM itineraries WHERE user_id = $1 AND itin_id = $2 RETURNING *",
    [user_id, itinerary.itinerary.itin_id]
  );
 

  let message = "Error in removing itinerary";
  if (result.length) {
    message = "Itinerary removed successfully";
  }
  console.log("message:", message);
  return { message };
}

module.exports = {
  create,
  get,
  remove
};
