const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();

  switch (req.method) {
    case "GET":
      try {
        if (
          req.query.email === undefined ||
          req.query.email === "" ||
          req.query.email === null ||
          req.query.token === undefined ||
          req.query.token === "" ||
          req.query.token === null
        ) {
          context.res.status = 400;
          context.res.message = "Please provide an email address and a token";
        } else {
          const resultSet = await pool
            .request()
            .input("email", sql.NVarChar, req.query.email)
            .input("token", sql.NVarChar, req.query.token)
            .query(
              `SELECT * FROM Employees WHERE Email = @email AND token = @token`
            );
          if (resultSet.recordset.length == 0) {
            context.res.status = 404;
            context.res.message = "No user found";
          } else {
            context.res.status = 200;
            context.res.body = resultSet.recordset;
          }
        }
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error connecting to the database",
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
          context.res.status = 400;
          context.res.message = "Email cannot be null or empty";
        } else {
          // Check if the email already exists in the database
          const existingEmail = await pool
            .request()
            .input("Email", sql.NVarChar, data.Email)
            .query("SELECT Email FROM Employees WHERE Email = @Email");

          if (existingEmail.recordset.length > 0) {
            context.res.status = 401;
            context.res.message = "Email already exists";
          } else {
            const resultSet = await pool
              .request()
              .input("Surname", sql.NVarChar, data.Surname)
              .input("Name", sql.NVarChar, data.Name)
              .input("Department", sql.NVarChar, data.Department)
              .input("Emp_type", sql.NVarChar, data.employeeType)
              .input("Email", sql.NVarChar, data.Email)
              .input("Token", sql.NVarChar, data.Token)
              .query(
                `INSERT INTO Employees (Email, Name, Surname, Department, EMP_type,token) OUTPUT INSERTED.* VALUES (@Email, @Name, @Surname, @Department, @Emp_type,@Token)`
              );
            console.log(resultSet.recordset);
            context.res.status = 200;
            context.res.body = resultSet.recordset[0];
          }
        }
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error inserting data into the database",
        };
        console.error("Error running query", err);
      }
      break;

    default:
      context.res = {
        status: 400,
        message: "Please send a GET or POST request",
      };
      break;
  }
};
