const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool.request().query(`SELECT * FROM Employees`);
        context.res = {
          status: 200,
          body: {
            data: resultSet.recordset,
            message: "Successfully retrieved employees",
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

    case "PUT":
      // console.log(data);
      try {
        if (
          data.Emp_ID === undefined ||
          data.Emp_ID === "" ||
          data.Emp_ID === null
        ) {
          context.res = {
            status: 400,
            message: "ID cannot be null or empty",
            body: {},
          };
        } else {
          // If the ID exists, update the Emp_type
          const resultSet = await pool
            .request()
            .input("Emp_ID", sql.Int, data.Emp_ID)
            .input("Emp_type", sql.NVarChar, data.EMP_type)
            .query(
              `UPDATE Employees SET EMP_type = @Emp_type WHERE Emp_ID = @Emp_ID`
            );

          context.res = {
            status: 200,
            message: "Employee type updated successfully",
            body: {},
          };
        }
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error inserting data into the database",
          body: {},
        };
        console.error("Error running query", err);
      }
      break;
    case "DELETE":
      try {
        if (
          data.Emp_ID === undefined ||
          data.Emp_ID === "" ||
          data.Emp_ID === null
        ) {
          context.res = {
            status: 400,
            message: "ID cannot be null or empty",
            body: {},
          };
        } else {
          // If the ID exists, delete the row
          //these are 2 seperates queries that i do in one line
          const resultSet = await pool
            .request()
            .input("Emp_ID", sql.Int, data.Emp_ID)
            .query(
              `DELETE FROM Tasks WHERE Emp_ID = @Emp_ID ;
                DELETE FROM Employees WHERE Emp_ID = @Emp_ID`
            );
          context.res = {
            staus: 200,
            body: { message: "Deleted" },
          };
        }
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error deleting data from the database",
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
