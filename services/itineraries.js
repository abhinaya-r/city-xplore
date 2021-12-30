const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const rows = await db.query(
    "SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2",
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(itinerary) {
  console.log("creating itinerary: ", itinerary);
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    itinerary.token,
  ]);
  let user_id = user[0].user_id;
  console.log(user_id);
  const result = await db.query(
    "INSERT INTO itineraries(user_id, itinerary, date) VALUES ($1, $2, $3) RETURNING *",
    [user_id, itinerary.itinerary, itinerary.date]
  );

  let message = "Error in creating itinerary";
  console.log("result: ", result);
  if (result.length) {
    message = "Itinerary created successfully";
    console.log(result.length);
  }
  console.log("message:", message);
  return { message };
}

async function get(token) {
  console.log("getting token: ", token.body.token);
  const getToken = token.body.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  console.log("user: ", user);
  let user_id = user[0].user_id;
  console.log(user_id);

  const result = await db.query(
    "SELECT * FROM itineraries WHERE user_id = $1",
    [user_id]
  );
  let message = "Error in getting itineraries";
  console.log("result: ", result);
  if (result.length) {
    message = "Got itineraries successfully";
    return result;
  }
  return null;
}

module.exports = {
  getMultiple,
  create,
  get,
};
