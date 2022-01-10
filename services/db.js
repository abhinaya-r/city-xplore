// https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/
const pool = require('../services/connect.js')

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);
    return rows;
}

module.exports = {
  query
}