const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  // const data = req.body;
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool.request().query(`SELECT * FROM Bookings`);
        context.res = {
          status: 200,
          body: {
            data: resultSet.recordset,
            message: "Successfully retrieved Bookings",
          },
        };
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error connecting to the database",
          body: {},
        };
        console.error("Error running query", err);
      }


      break;
    default:
      context.res = {
        status: 400,
        message: "Please send a GET or POST request",
        body: {},
      };
      break;
  }
};
