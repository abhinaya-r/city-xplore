/* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/ */
const db = require("./db");


async function create(users) {
  const token = Math.random().toString(36).substring(2, 12);
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
  if (result.length) {
    message = "User created successfully";
    return { token };
  }
  console.log("message:", message);
  return { message: message, token: token };
}

async function update(users) {
  const result = await db.query(
    "UPDATE users SET first_name = $1, last_name = $2, email = $3, birthday = $4, gender = $5 WHERE token = $6 RETURNING *;",
    [
      users.first_name,
      users.last_name,
      users.email,
      users.birthday,
      users.gender,
      users.token
    ]
  );
  let message = "Error in updating user";
  if (result.length) {
    message = "User updated successfully";
  }
  console.log("message:", message);
  return {message};
}

async function resetPassword(users) {
  const result = await db.query(
    "UPDATE users SET password = $1 WHERE token = $2 RETURNING *;",
    [
      users.password,
      users.token
    ]
  );
  let message = "Error in updating password";
  if (result.length) {
    message = "User password updated successfully";
  }
  console.log("message:", message);
  return {message};
}

async function remove(token) {
  let result = await db.query(
    "DELETE FROM users WHERE token = $1 RETURNING *",
    [token.token]
  );
  let message = "User deleted successfully";
  if (!result.length) {
    message = "Error in deleting user";
  }
  let user_id = result[0].user_id;
  result = await db.query(
    "DELETE FROM itineraries WHERE user_id = $1 RETURNING *",
    [user_id]
  );

  result = await db.query(
    "DELETE FROM activities WHERE user_id = $1 RETURNING *",
    [user_id]
  );
  console.log("message:", message);
  return {message};
}

async function get(user) {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [user.query.email, user.query.password]
  );
  let message = "Error in getting user";
  if (result.length) {
    message = "Got User successfully";
    let token = result[0].token;
    return { token };
  }
  return null;
}

async function getToken(user) {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [user.query.email]
  );
  let message = "Error in getting user";
  if (result.length) {
    message = "Got User successfully";
    let token = result[0].token;
    return { message: message, token:token };
  }
  return { message: message, token:null };
}

async function getAll(token) {
  const getToken = token.query.token;
  const result = await db.query(
    "SELECT * FROM users WHERE token = $1",
    [getToken]
  );
  let message = "Error in getting user";
  if (result.length) {
    message = "Got User successfully";
    return {message: message, user: result[0]};
  }
  return null;
}

module.exports = {
  create,
  get,
  getAll,
  resetPassword,
  update,
  remove,
  getToken
};
