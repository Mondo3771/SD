const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  const data = req.body;
  switch (req.method) {
    case "GET":
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

      break;
    case "DELETE":
      try {
        if (
          data.Meal_ID === undefined ||
          data.Meal_ID === "" ||
          data.Meal_ID === null
        ) {
          context.res = {
            status: 400,
            message: "ID cannot be null or empty",
            body: {},
          };
        } else {
          const resultSet = await pool
            .request()
            .input("Meal_ID", sql.Int, data.Meal_ID)
            .query(`DELETE FROM Booking WHERE Meal_ID = @Meal_ID;
            DELETE FROM Meals WHERE Meal_ID = @Meal_ID`);
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
          // If the ID exists, update the Emp_type
          const resultSet = await pool
            .request()
            .input("Name_of_Meal", sql.NVarChar, data.Name_of_Meal)
            .input("Availability", sql.Bit, data.Availability)
            .input("Description", sql.NVarChar, data.Description)
            .query(
              `INSERT INTO Meals (Name_of_Meal, Availability,Description) 
             VALUES (@Name_of_Meal, @Availability, @Description)`
            );

          context.res = {
            status: 200,
            message: "Booking type Deleted successfully",
            body: {},
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
            data.Meal_ID === undefined ||
            data.Meal_ID === "" ||
            data.Meal_ID === null
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
                .input("Availability", sql.Bit, data.Availability)
                .query(
                `UPDATE Meals SET Availability = @Availability, WHERE Meal_ID = @Meal_ID`
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
