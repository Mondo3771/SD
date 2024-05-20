const getPool = require("../db");
const sql = require("mssql");
const Getemps = require("../Authenticate");
module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool.request().query(`SELECT * FROM Employees`);
        let req = {
          method: "GET",
        };
        // Call the function
        const emp = await Getemps(context, req).then(() => {
          return context.res.body;
        });
        let lookup = emp.reduce((acc, obj) => {
          acc[obj.user_id] = obj;
          return acc;
        }, {});

        let result = resultSet.recordset.map((obj1) => {
          let obj2 = lookup[obj1.token];
          if (obj2) {
            return {
              Emp_ID: obj1.Emp_ID,
              Department: obj1.Department,
              EMP_type: obj1.EMP_type,
              token: obj1.token,
              Name: obj2.given_name,
              Surname: obj2.family_name,
            };
          } else {
            return { Emp_ID: obj1.Emp_ID, token: obj1.token };
          }
        });

        // console.log(result);
        context.res = {
          status: 200,
          body: {
            data: result,
            message: "Successfully retrieved employees",
          },
        };
        // console.log(context.res);
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
              .input("Department", sql.NVarChar, data.Department)
              .query(
                `UPDATE Employees SET EMP_type = @Emp_type, Department = @Department WHERE Emp_ID = @Emp_ID`
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
              DELETE FROM Bookings WHERE Emp_ID = @Emp_ID ;
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
