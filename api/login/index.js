module.exports = async function (context, req) {
  async function connectAndQuery() {
    try {
      var resultSet = await poolConnection
        .request()
        .query(`SELECT * FROM CARS`);

      // close connection only when we're certain application is finished

      // Set context.res.body here, where resultSet is defined
      context.res = {
        body: resultSet.recordset,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Log the resultSet
      console.log(resultSet.recordset);
    } catch (err) {
      context.res = {
        status: 500,
        body: "Error connecting to the database",
      };
      console.error("Error running query", err);
    }
  }

  await connectAndQuery();
};

module.exports = async function (context, req) {
  const id = req.params.id;
  const sql = require("mssql");

  const config = {
    user: "azureuser", // better stored in an app setting such as process.env.DB_USER
    password: process.env.password, // better stored in an app setting such as process.env.DB_PASSWORD
    server: "mysqlserverkabza.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: "LuckyCars", // better stored in an app setting such as process.env.DB_NAME
    authentication: {
      type: "default",
    },
    options: {
      encrypt: true,
    },
  };

  console.log("Starting...");
  var poolConnection = await sql.connect(config);
  async function connectAndQuery() {
    try {
      var resultSet = await poolConnection
        .request()
        .query(`SELECT * FROM CARS`);

      // close connection only when we're certain application is finished

      // Set context.res.body here, where resultSet is defined
      return resultSet.recordset;
    } catch (err) {
      context.res = {
        status: 500,
        body: "Error connecting to the database",
      };
      console.error("Error running query", err);
    }
  }
  var cars = await connectAndQuery();
  switch (req.method) {
    case "GET":
      if (id) {
        const car = cars.find((car) => String(car.id) === String(id));
        if (car) {
          context.res = { body: car };
        } else {
          context.res = {
            status: 404,
            body: { message: `Car with id ${id} not found.` },
          };
        }
      } else {
        context.res = { body: cars };
      }
      break;
    case "PUT":
      const updatedCar = req.body;
      const index = cars.findIndex((car) => String(car.id) === String(id));
      if (index !== -1) {
        cars[index] = updatedCar;
        context.res = { body: updatedCar };
      } else {
        context.res = {
          status: 404,
          body: { message: `Car with id ${id} not found.` },
        };
      }
      break;
    case "DELETE":
      console.log(cars);
      const deleteIndex = cars.findIndex(
        (car) => String(car.id) === String(id)
      );
      //   console.log(id, "id");
      //   console.log(deleteIndex, "dfewfdafds");
      if (id !== -1) {
        const result = await poolConnection
          .request()
          .input("id", sql.Int, id)
          .query(`DELETE FROM Cars WHERE id = ${id}`);
        console.log(result);
        context.res = { body: { message: `Car with id ${id} deleted.` } };
      } else {
        context.res = {
          status: 404,
          body: { message: `Car with id ${id} not found.` },
        };
      }
      break;
    case "POST":
      async function addCar(newCar) {
        try {
          const result = await poolConnection
            .request()
            .input("make", sql.NVarChar, newCar.make)
            .input("model", sql.NVarChar, newCar.model)
            .input("year", sql.Int, newCar.year)
            .input("price", sql.Decimal(10, 2), newCar.price)
            .query(
              "INSERT INTO Cars (make, model, year, price) VALUES (@make, @model, @year, @price)"
            );

          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
      const newCar = req.body;
      addCar(newCar);
      context.res = { body: newCar };
      break;
    default:
      context.res = {
        status: 400,
        body: "Please make a GET, PUT, DELETE, or POST request.",
      };
      break;
  }
};
