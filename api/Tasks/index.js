const getPool = require("../db");
const sql = require("mssql");

module.exports = async function (context, req) {
  const pool = await getPool();
  switch (req.method) {
    case "GET":
      const Emp_id = req.query.Emp_ID || (req.body && req.body.Emp_ID);
      if (Emp_id) {
        try {
          const result = await pool
            .request()
            .input("Emp_id", sql.Int, Emp_id)
            .query("SELECT * FROM Tasks WHERE Emp_ID = @Emp_id");
          context.res = {
            status: 200,
            body: {
              data: result.recordset,
              message: "Successfully retrieved tasks",
            },
          };
        } catch (err) {
          context.res = {
            status: 500,
            body: { message: "Error executing query" },
          };
        }
      } else {
        context.res = {
          status: 400,
          body: {
            message:
              "Please pass emp_id on the query string or in the request body",
          },
        };
      }
      break;
    case "POST":
      const task = req.body;
      if (
        task &&
        task.Emp_ID &&
        task.Project &&
        task.Date &&
        task.Description &&
        task.Time !== undefined
      ) {
        try {
          const result = await pool
            .request()
            .input("Emp_ID", sql.Int, task.Emp_ID)
            .input("Project", sql.NVarChar, task.Project)
            .input("Date", sql.DateTime, task.Date)
            .input("Description", sql.NVarChar, task.Description)
            .input("Time", sql.Int, task.Time)
            .input("Active", sql.Bit, task.Active)
            .query(
              `INSERT INTO Tasks (Emp_ID, Project, Date, Description, Time, Active) OUTPUT INSERTED.* VALUES (@Emp_ID, @Project, @Date, @Description, @Time, @Active)`
            );
          context.res = {
            status: 200,
            body: {
              data: result.recordset[0],
              message: "Task successfully created",
            },
          };
        } catch (err) {
          context.res = {
            status: 500,
            body: { message: "Error executing query" },
          };
        }
      } else {
        context.res = {
          status: 400,
          body: {
            message: "Please provide all task details in the request body",
          },
        };
      }
      break;
    case "PUT":
      //this is the stop function
      const Task_ID = req.query.Task_ID;
      console.log(Task_ID);
      if (Task_ID) {
        try {
          await pool
            .request()
            .input("Task_ID", sql.Int, Task_ID)
            .query(`UPDATE Tasks SET Active = 1 WHERE Task_ID = @Task_ID`);

          context.res = {
            status: 200,
            body: { message: "Task successfully updated" },
          };
        } catch (err) {
          context.res = {
            status: 500,
            body: { message: "Error executing query" },
          };
        }
      } else {
        const task = req.body;
        const Task_ID = req.body.Task_ID;
        console.log(task);
        if (Task_ID && task.Time !== undefined) {
          try {
            await pool
              .request()
              .input("Task_ID", sql.Int, Task_ID)
              .input("Time", sql.Int, task.Time)
              .query(`UPDATE Tasks SET Time = @Time WHERE Task_ID = @Task_ID`);
            context.res = {
              status: 200,
              body: { message: "Task successfully updated" },
            };
          } catch (err) {
            context.res = {
              status: 500,
              body: { message: "Error executing query" },
            };
          }
        } else {
          context.res = {
            status: 400,
            body: {
              message:
                "Please provide task details in the request body and task id in the query",
            },
          };
        }
      }
      break;
    case "DELETE":
      const task_ID = req.query.Task_ID || req.body.Task_ID;
      if (task_ID) {
        try {
          await pool
            .request()
            .input("Task_ID", sql.Int, task_ID)
            .query("DELETE FROM Tasks WHERE Task_ID = @Task_ID");
          context.res = {
            status: 200,
            body: { message: "Task successfully deleted" },
          };
        } catch (err) {
          context.res = {
            status: 500,
            body: { message: "Error executing query" },
          };
        }
      } else {
        context.res = {
          status: 400,
          body: { message: "Please provide task id in the query" },
        };
      }
      break;
    default:
      context.res = {
        status: 400,
        body: { message: "Invalid request method" },
      };
      break;
  }
};
