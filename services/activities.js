// https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/
const db = require("./db");

async function addFavorite(activity) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  const exists = await db.query(
    "SELECT exists(SELECT 1 from activities WHERE user_id=$1 AND activity = $2 AND status=$3)",
    [user_id, activity.activity, "favorite"]
  );
  if (exists[0].exists) {
    return { message: "Activity already added to favorites" };
  }

  const result = await db.query(
    "INSERT INTO activities(user_id, activity, status) VALUES ($1, $2, $3) RETURNING *",
    [user_id, activity.activity, "favorite"]
  );

  let message = "Error in adding activity to favorites";
  if (result.length) {
    message = "Activity added successfully";
  }
  console.log("message:", message);
  return { message };
}

async function addBlacklist(activity) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  const exists = await db.query(
    "SELECT exists(SELECT 1 from activities WHERE user_id=$1 AND activity = $2 AND status=$3)",
    [user_id, activity.activity, "blacklist"]
  );
  if (exists[0].exists) {
    return { message: "Activity already added to blacklist" };
  }

  const result = await db.query(
    "INSERT INTO activities(user_id, activity, status) VALUES ($1, $2, $3) RETURNING *",
    [user_id, activity.activity, "blacklist"]
  );

  let message = "Error in adding activity to blacklist";
  if (result.length) {
    message = "Activity added successfully";
  }
  console.log("message:", message);
  return { message };
}

async function removeFavorite(activity) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  const result = await db.query(
    "DELETE FROM activities WHERE user_id = $1 AND activity = $2 AND status = $3 RETURNING *",
    [user_id, activity.activity, "favorite"]
  );

  let message = "Error in removing activity to favorites";
  if (result.length) {
    message = "Activity removed successfully";
  }
  console.log("message:", message);
  return { message };
}

async function removeBlacklist(activity) {
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    activity.token,
  ]);
  let user_id = user[0].user_id;
  const result = await db.query(
    "DELETE FROM activities WHERE user_id = $1 AND activity = $2 AND status = $3",
    [user_id, activity.activity, "blacklist"]
  );

  let message = "Error in adding activity to blacklist";
  if (result.length) {
    message = "Activity blacklisted successfully";
  }
  console.log("message:", message);
  return { message };
}

async function getFavorites(token) {
  const getToken = token.query.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  let user_id = user[0].user_id;
  const result = await db.query(
    "SELECT * FROM activities WHERE user_id = $1 AND status = $2",
    [user_id, "favorite"]
  );
  let message = "Error in getting favorites";
  if (result.length) {
    message = "Got favorites successfully";
    return result;
  }
  return null;
}

async function getBlacklist(token) {
  const getToken = token.query.token;
  const user = await db.query("SELECT (user_id) FROM users WHERE token = $1", [
    getToken,
  ]);
  let user_id = user[0].user_id;

  const result = await db.query(
    "SELECT * FROM activities WHERE user_id = $1 AND status = $2",
    [user_id, "blacklist"]
  );
  let message = "Error in getting blacklist";
  if (result.length) {
    message = "Got blacklist successfully";
    return result;
  }
  return null;
}

module.exports = {
  addFavorite,
  addBlacklist,
  getFavorites,
  getBlacklist,
  removeFavorite,
  removeBlacklist,
};
