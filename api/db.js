const sql = require("mssql");

const config = {
  user: "azureuser",
  password: "30012004Kb.",
  server: "mysqlserverkabza.database.windows.net",
  port: 1433,
  database: "SD_Project",
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
