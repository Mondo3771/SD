const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  let data = req.body;
  switch (req.method) {
    case "GET":
      try {
        const Emp_ID = req.query.Emp_ID;
        const resultSet = await pool
          .request()
          .input("Emp_ID", sql.Int, Emp_ID)
          .query(
            `SELECT * FROM Messages where Sent_ID = @Emp_ID or Receive_ID = @Emp_ID ORDER BY Date DESC`
          );
        console.log(resultSet.recordset);
        context.res = {
          status: 200,
          body: {
            data: resultSet.recordset,
            message: "Successfully retrieved Messages",
          },
        };
        // console.log(context);
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
        console.log(data);
        if (
          data.Rec_ID === undefined ||
          data.Rec_ID === "" ||
          data.Rec_ID === null
        ) {
          context.res = {
            status: 400,
            message: "ID cannot be null or empty",
            body: {},
          };
        } else {
          console.log(data);
          const resultSet = await pool
            .request()
            .input("Send_ID", sql.Int, data.Send_ID)
            .input("Rec_ID", sql.Int, data.Rec_ID)
            .input("Date", sql.Date, data.Date)
            .input("Message", sql.VarChar, data.Message)
            .query(
              `INSERT INTO Messages (Sent_ID, Receive_ID, Date,Message) OUTPUT INSERTED. *
             VALUES (@Send_ID, @Rec_ID, @Date, @Message)`
            );
          console.log(resultSet.recordset[0]);
          context.res = {
            status: 200,
            message: "Message added successfully",
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
