const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  switch (req.method) {
    case "GET":
      if (req.query.Emp_ID === undefined || req.query.Emp_ID === null) {
        try {
          const resultSet = await pool.request().query(`SELECT * FROM Meals`);
          context.res = {
            status: 200,
            body: {
              data: resultSet.recordset,
              message: "Successfully retrieved meals",
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
      } else {
        try {
          const resultSet = await pool
            .request()
            .input("Emp_ID", sql.Int, req.query.Emp_ID)
            .query(
              `SELECT Meals.* From Bookings JOIN Meals ON Bookings.Meal_ID = Meals.Meal_ID Where Bookings.Emp_ID = @Emp_ID`
            );
          context.res = {
            status: 200,
            body: {
              data: resultSet.recordset,
              message: "Successfully retrieved Meals",
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
      }
      break;
    case "DELETE":
      try {
        if (
          data.Booking_ID === undefined ||
          data.Booking_ID === "" ||
          data.Booking_ID === null
        ) {
          context.res = {
            status: 400,
            message: "ID cannot be null or empty",
            body: {},
          };
        } else {
          const resultSet = await pool
            .request()
            .input("Bookings_ID", sql.Int, data.Booking_ID)
            .query(`DELETE FROM Bookings WHERE Booking_ID = @Bookings_ID `);
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
    case "POST":
      try {
        if (
          data.Meal_ID === undefined ||
          data.Meal_ID === "" ||
          data.Meal_ID === null ||
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
          console.log(data);
          // If the ID exists, update the Emp_type
          const resultSet = await pool
            .request()
            .input("Emp_ID", sql.Int, data.Emp_ID)
            .input("Meal_ID", sql.Int, data.Meal_ID)
            .input("Date_of_booking", sql.Date, data.Date_of_booking)
            .query(
              `INSERT INTO Bookings (Emp_ID, Meal_ID, Date_of_booking) OUTPUT INSERTED. *
             VALUES (@Emp_ID, @Meal_ID, @Date_of_booking)`
            );

          context.res = {
            status: 200,
            message: "Booking type Deleted successfully",
            body: { data: resultSet.recordset[0] },
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
    default:
      context.res = {
        status: 400,
        message: "Please send a GET or POST request",
        body: {},
      };
      break;
  }
};