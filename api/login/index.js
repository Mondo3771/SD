const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();

  switch (req.method) {
    case "GET":
      try {
        if (
          req.query.Email === undefined ||
          req.query.Email === "" ||
          req.query.Email === null ||
          req.query.Token === undefined ||
          req.query.Token === "" ||
          req.query.Token === null
        ) {
          context.res = {
            status: 400,
            body: { message: "Please provide an email address and a token" },
          };
        } else {
          const resultSet = await pool
            .request()
            .input("Email", sql.NVarChar, req.query.Email)
            .input("Token", sql.NVarChar, req.query.Token)
            .query(
              `SELECT * FROM Employees WHERE Email = @Email AND token = @Token`
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
          data.Email === undefined ||
          data.Email === "" ||
          data.Email === null
        ) {
          context.res = {
            status: 400,

            bode: { message: "Email cannot be null or empty" },
          };
        } else {
          // Check if the email already exists in the database
          const existingEmail = await pool
            .request()
            .input("Email", sql.NVarChar, data.Email)
            .query("SELECT Email FROM Employees WHERE Email = @Email");

          if (existingEmail.recordset.length > 0) {
            context.res = {
              status: 401,
              body: { message: "Email already exists" },
            };
          } else {
            const resultSet = await pool
              .request()
              .input("Surname", sql.NVarChar, data.Surname)
              .input("Name", sql.NVarChar, data.Name)
              .input("Department", sql.NVarChar, data.Department)
              .input("Emp_type", sql.NVarChar, data.EMP_type)
              .input("Email", sql.NVarChar, data.Email)
              .input("Token", sql.NVarChar, data.Token)
              .query(
                `INSERT INTO Employees (Email, Name, Surname, Department, EMP_type,token) OUTPUT INSERTED.* VALUES (@Email, @Name, @Surname, @Department, @Emp_type,@Token)`
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
