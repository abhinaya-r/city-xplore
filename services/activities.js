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

async function addFavorite(activity) {
  console.log("add favorite: ", activity);
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  console.log("user: ", user);
  let user_id = user[0].user_id;
  console.log(user_id);
  const result = await db.query(
    "INSERT INTO activities(user_id, activity, status) VALUES ($1, $2, $3) RETURNING *",
    [user_id, activity.activity, "favorite"]
  );

  let message = "Error in adding activity to favorites";
  console.log("result: ", result);
  if (result.length) {
    message = "Activity added successfully";
    console.log(result.length);
  }
  console.log("message:", message);
  return { message };
}

async function addBlacklist(activity) {
  console.log("add blacklist: ", activity);
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  console.log(user_id);
  const result = await db.query(
    "INSERT INTO activities(user_id, activity, status) VALUES ($1, $2, $3) RETURNING *",
    [user_id, activity.activity, "blacklist"]
  );

  let message = "Error in adding activity to blacklist";
  console.log("result: ", result);
  if (result.length) {
    message = "Activity added successfully";
    console.log(result.length);
  }
  console.log("message:", message);
  return { message };
}

async function removeFavorite(activity) {
  console.log("add favorite: ", activity);
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  console.log(user_id);
  const result = await db.query(
    "DELETE FROM activities WHERE user_id = $1 AND activity = $2 AND status = $3",
    [user_id, activity.activity, "favorite"]
  );

  let message = "Error in adding activity to favorites";
  console.log("result: ", result);
  if (result.length) {
    message = "Activity added successfully";
    console.log(result.length);
  }
  console.log("message:", message);
  return { message };
}

async function removeBlacklist(activity) {
  console.log("add blacklist: ", activity);
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  console.log(user_id);
  const result = await db.query(
    "DELETE FROM activities WHERE user_id = $1 AND activity = $2 AND status = $3",
    [user_id, activity.activity, "blacklist"]
  );

  let message = "Error in adding activity to blacklist";
  console.log("result: ", result);
  if (result.length) {
    message = "Activity added successfully";
    console.log(result.length);
  }
  console.log("message:", message);
  return { message };
}

async function getFavorites(token) {
  console.log("getting token: ", token.body.token);
  const getToken = token.query.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  console.log("user: ", user);
  let user_id = user[0].user_id;
  console.log(user_id);

  const result = await db.query(
    "SELECT * FROM activities WHERE user_id = $1 AND status = $2",
    [user_id, "favorite"]
  );
  let message = "Error in getting favorites";
  console.log("result: ", result);
  if (result.length) {
    message = "Got favorites successfully";
    return result;
  }
  return null;
}

async function getBlacklist(token) {
  console.log("getting token: ", token.body.token);
  const getToken = token.body.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  console.log("user: ", user);
  let user_id = user[0].user_id;
  console.log(user_id);

  const result = await db.query(
    "SELECT * FROM activities WHERE user_id = $1 AND status = $2",
    [user_id, "blacklist"]
  );
  let message = "Error in getting blacklist";
  console.log("result: ", result);
  if (result.length) {
    message = "Got blacklist successfully";
    return result;
  }
  return null;
}

module.exports = {
  getMultiple,
  addFavorite,
  addBlacklist,
  getFavorites,
  getBlacklist,
  removeFavorite,
  removeBlacklist,
};
