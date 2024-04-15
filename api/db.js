const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: 1433,
  database: process.env.DB_NAME,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

let pool;
const getPool = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};

module.exports = getPool;
