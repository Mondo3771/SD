const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();

  switch (req.method) {
    case "GET":
      try {
        if (
          req.query.Token === undefined ||
          req.query.Token === "" ||
          req.query.Token === null
        ) {
          context.res = {
            status: 400,
            body: { message: "Please provide a token" },
          };
        } else {
          const resultSet = await pool
            .request()
            .input("Token", sql.NVarChar, req.query.Token)
            .query(
              `SELECT * FROM Employees WHERE token = @Token`
            );
          if (resultSet.recordset.length == 0) {
            context.res = {
              status: 404,
              body: { message: "No user found" },
            };
          } else {
            context.res = {
              status: 200,
              body: {
                data: resultSet.recordset[0],
                message: "Successfully retrieved employee",
              },
            };
          }
        }
      } catch (err) {
        context.res = {
          status: 500,
          body: { message: "Error connecting to the database" },
        };
        console.error("Error running query", err);
      }
      break;

    case "POST":
      const data = req.body;
      try {
        if (
          data.Token === undefined ||
          data.Token === "" ||
          data.Token === null
        ) {
          context.res = {
            status: 400,
            bode: { message: "Email cannot be null or empty" },
          };
        } else {
          // Check if the email already exists in the database
          const existingEmail = await pool
            .request()
            .input("Token", sql.NVarChar, data.token)
            .query("SELECT token FROM Employees WHERE token = @token");

          if (existingEmail.recordset.length > 0) {
            context.res = {
              status: 401,
              body: { message: "Users already exists" },
            };
          } else {
            const resultSet = await pool
              .request()
              .input("Department", sql.NVarChar, data.Department)
              .input("Emp_type", sql.NVarChar, data.EMP_type)
              .input("Token", sql.NVarChar, data.Token)
              .query(
                `INSERT INTO Employees (Department, EMP_type,token) OUTPUT INSERTED.* VALUES (@Department, @Emp_type,@Token)`
              );
            context.res = {
              status: 200,
              body: {
                data: resultSet.recordset[0],
                message: "Employee added successfully",
              },
            };
          }
        }
      } catch (err) {
        context.res = {
          status: 500,

          body: { message: "Error inserting data into the database" },
        };
        console.error("Error running query", err);
      }
      break;

    default:
      context.res = {
        status: 400,

        body: { message: "Please send a GET or POST request" },
      };
      break;
  }
};
