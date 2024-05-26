const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body || req.query;
  // console.log(req.body);
  switch (req.method) {
    case "GET":
      try {
        const resultSet = await pool
          .request()
          .query(`SELECT * FROM Carwash_Booking where Emp_ID = ${data.Emp_ID}  and date >= CAST(GETDATE() AS DATE)`);
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
          .input("Car_wash", sql.Int, data.Car_wash)
          .input("Date", sql.NVarChar, data.Date)
          .input("Emp_ID", sql.Int, data.Emp_ID)
          .query(`INSERT INTO Carwash_Booking (Car_wash,Emp_ID, Date) 
          OUTPUT INSERTED.*
          VALUES (@Car_wash, @Emp_ID,@Date)`);

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
      case "DELETE":
        try {
            if (!data.booking_id) {
            context.res = {
                status: 400,
                message: "Please send a booking_id",
                body: {},
            };
            return;
            }
            const resultSet = await pool
            .request()
            .input("booking_id", sql.Int, data.booking_id)
            .query(`DELETE FROM Carwash_Booking WHERE booking_id = @booking_id`);
    
            context.res = {
            status: 200,
            body: {
                data: resultSet.recordset,
                message: "Successfully deleted data",
            },
            };
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
