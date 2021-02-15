const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'server',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});
module.exports = pool;