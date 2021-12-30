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
  console.log(db);
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

module.exports = {
  getMultiple,
  create,
  get,
};
