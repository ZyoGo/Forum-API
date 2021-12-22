/* istanbul ignore file */
const { Pool } = require('pg');

const testConfig = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

const pool = process.env.NODE_ENV === 'test' ? new Pool(testConfig) : new Pool();

module.exports = pool;
