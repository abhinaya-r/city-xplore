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

async function create(users) {
  console.log("creating user: ", users);
  const token = Math.random().toString(36).substring(2, 12);
  console.log(token);
  const result = await db.query(
    "INSERT INTO users(first_name, last_name, password, email, created_on, birthday, gender, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      users.first_name,
      users.last_name,
      users.password,
      users.email,
      users.created_on,
      users.birthday,
      users.gender,
      token,
    ]
  );
  let message = "Error in creating user";
  console.log("result: ", result);
  if (result.length) {
    message = "User created successfully";
    console.log(result.length);
    return { token };
  }
  console.log("message:", message);
  console.log("token:", token);
  return { message: message, token: token };
}

async function update(users) {
  console.log("edit user: ", users);
  const result = await db.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, birthday = $4, gender = $5, password = $6 WHERE token = $7 RETURNING *;",
    [
      users.first_name,
      users.last_name,
      users.email,
      users.birthday,
      users.gender,
      users.password,
      users.token
    ]
  );
  let message = "Error in updating user";
  console.log("result: ", result);
  if (result.length) {
    message = "User updated successfully";
  }
  console.log("message:", message);
  return {message};
}

async function remove(token) {
  console.log("removing user: ", token);
  let result = await db.query(
    "DELETE FROM users WHERE token = $1 RETURNING *",
    [
      token.token
    ]
  );
  let message = "User deleted successfully";
  console.log("result: ", result);
  console.log("result:", result);
  if (!result.length) {
    message = "Error in deleting user";
  }
  let user_id = result[0].user_id;
  result = await db.query(
    "DELETE FROM itineraries WHERE user_id = $1 RETURNING *",
    [
      user_id
    ]
  );
  console.log("message:", message);
  return {message};
}

async function get(user) {
  console.log("getting user: ", user.query);
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [user.query.email, user.query.password]
  );
  let message = "Error in getting user";
  console.log("result: ", result);
  if (result.length) {
    message = "Got User successfully";
    console.log("token: ", result[0].token);
    let token = result[0].token;
    console.log(token);
    return { token };
  }
  return null;
}

async function getAll(token) {
  console.log("getting token: ", token.query);
  const getToken = token.query.token;
  const result = await db.query(
    "SELECT * FROM users WHERE token = $1",
    [getToken]
  );
  let message = "Error in getting user";
  console.log("result: ", result[0]);
  if (result.length) {
    message = "Got User successfully";
    console.log("token: ", result[0].token);
    return {message: message, user: result[0]};
  }
  return null;
}

module.exports = {
  getMultiple,
  create,
  get,
  getAll,
  update,
  remove
};
