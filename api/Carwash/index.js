const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  // console.log(req.body);
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool.request().query(`SELECT * FROM Carwashs`);
        context.res = {
          status: 200,
          body: {
            data: resultSet.recordset,
            message: "Successfully retrieved Carwashs",
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
    case "POST":
      try {
        // If the ID exists, update the Emp_type
        const resultSet = await pool
          .request()
          .input("Quantity", sql.Int, data.Quantity)
          .input("Date", sql.NVarChar, data.Date)
          .query(`INSERT INTO Carwashs (Quantity, Date) 
          OUTPUT INSERTED.*
          VALUES (@Quantity, @Date)`);

        context.res = {
          status: 200,
          body: {
            data: resultSet.recordset[0],
            message: "Successfully inserted data",
          },
        };
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error inserting data into the database",
          body: {},
        };
        console.error("Error running query", err);
      }

      break;
    case "PUT":
      try {
        if (
          data.Car_wash === undefined ||
          data.Car_wash === "" ||
          data.Car_wash === null
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
            .input("Quantity", sql.Bit, data.Quantity)
            .input("Car_wash", sql.Int, data.Car_wash)
            .query(
              `UPDATE Carwashs SET Quantity = @Quantity WHERE Car_wash = @Car_wash`
            );

          context.res = {
            status: 200,
            message: "Booking type Deleted successfully",
            body: {},
          };
        }
      } catch (err) {
        context.res = {
          status: 500,
          message: "Error updating data in the database",
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
