const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const rows = await db.query(
    'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(users) {
  console.log("creating user: ", users)
  console.log(db);
  const token = Math.random().toString(36).substring(0,10);
  console.log(token);  
  const result = await db.query(
    'INSERT INTO users(first_name, last_name, password, email, created_on, birthday, gender, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [users.first_name, users.last_name, users.password, users.email, users.created_on, users.birthday, users.gender, token]
  );
  let message = 'Error in creating user';
  console.log("result: ", result)
  if (result.length) {
    message = 'User created successfully';
    console.log(result.length)
  }

  return {message: message, token: token};
}

async function get(user) {
  console.log("getting user: ", user.query.email) 
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1"
    ,[user.query.email]
  );
  let message = 'Error in getting user';
  console.log("result: ", result)
  if (result.length) {
    message = 'Got User successfully';
  }
  return {result};
}

module.exports = {
  getMultiple,
  create,
  get
}