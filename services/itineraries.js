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

async function create(itinerary) {
  console.log("creating itinerary: ", itinerary)
  const result = await db.query(
    'SELECT * FROM itineraries;',
    // [users.first_name, users.last_name, users.password, users.email, users.created_on, users.birthday, users.gender, token]
  );
  let message = 'Error in creating user';
  console.log("result: ", result)
  if (result.length) {
    message = 'User created successfully';
    console.log(result.length)
    // return {token};
  }
  console.log("message:", message)
  return {message};
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
    console.log("token: ", result[0].token)
    return result[0].token;
  }
  return null;
}

module.exports = {
  getMultiple,
  create,
  get
}