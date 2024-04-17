const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool.request().query(`SELECT * FROM Employees`);
        context.res.body = resultSet.recordset;
      } catch (err) {
        context.res = {
          status: 500,
          body: "Error connecting to the database",
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
          context.res.status = 400;
          context.res.body = "ID cannot be null or empty";
        } else {
          // Check if the ID exists in the database
          const existingID = await pool
            .request()
            .input("Emp_ID", sql.Int, data.Emp_ID)
            .query(`SELECT Emp_ID FROM Employees WHERE Emp_ID = @Emp_ID`);
console.log(data.Emp_ID);
console.log(existingID);
          if (existingID.recordset.length > 0) {
            // If the ID exists, update the Emp_type
            const resultSet = await pool
              .request()
              .input("Emp_ID", sql.Int, data.Emp_ID)
              .input("Emp_type", sql.NVarChar, data.EMP_type)
              .query(
                `UPDATE Employees SET EMP_type = @Emp_type WHERE Emp_ID = @Emp_ID`
              );
            context.res.status = 200;
            context.res.body = "Employee type updated successfully";
          } else {
            context.res.status = 404;
            context.res.body = "ID not found";
          }
        }
      } catch (err) {
        context.res = {
          status: 500,
          body: "Error inserting data into the database",
        };
        console.error("Error running query", err);
      }
      break;
    case "DELETE":
      console.log(data);
      try {
        if (
          data.Emp_ID === undefined ||
          data.Emp_ID === "" ||
          data.Emp_ID === null
        ) {
          context.res.status = 400;
          context.res.body = "ID cannot be null or empty";
        } else {
          // Check if the ID exists in the database
          const existingID = await pool
          .request()
          .input("Emp_ID", sql.Int, data.Emp_ID)
          .query(`SELECT Emp_ID FROM Employees WHERE Emp_ID = @Emp_ID`);
            console.log(data);
            console.log(data.Emp_ID);
            console.log(existingID.recordset);
          if (existingID.recordset.length > 0) {
            // If the ID exists, delete the row
            const resultSet = await pool
              .request()
              .input("Emp_ID", sql.Int, data.Emp_ID)
              .query(`DELETE FROM Employees WHERE Emp_ID = @Emp_ID`);
            context.res ={
              "staus": 200,
              "message": "Deleted"
            }
          } else {
            context.res.status = 404;
            context.res.body = "ID not found";
          }
        }
      } catch (err) {
        context.res = {
          status: 500,
          body: "Error deleting data from the database",
        };
        console.error("Error running query", err);
      }
      break;
    default:
      context.res = {
        status: 400,
        body: "Please send a GET or POST request",
      };
      break;
  }
};