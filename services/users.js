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
    const result = await db.query(
      'INSERT INTO users(first_name, last_name, password, email, created_on, birthday, gender, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [users.first_name, users.last_name, users.password, users.email, users.created_on, users.birthday, users.gender, users.last_login]
    );
    let message = 'Error in creating user';
  
    if (result.length) {
      message = 'User created successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create
}