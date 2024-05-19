const getcarwash = () => {
  // this is what you get back
  // {
  //     "data": [
  //       {
  //         "Car_wash": 1,
  //         "date": "2022-01-01T00:00:00.000Z",
  //         "Quantity": 10
  //       },
  //       {
  //         "Car_wash": 2,
  //         "date": "2022-01-02T00:00:00.000Z",
  //         "Quantity": 15
  //       },
  //       {
  //         "Car_wash": 3,
  //         "date": "2022-01-03T00:00:00.000Z",
  //         "Quantity": 20
  //       },
  //       {
  //         "Car_wash": 4,
  //         "date": "2022-01-04T00:00:00.000Z",
  //         "Quantity": 25
  //       },
  //       {
  //         "Car_wash": 5,
  //         "date": "2022-01-05T00:00:00.000Z",
  //         "Quantity": 30
  //       },
  //       {
  //         "Car_wash": 6,
  //         "date": "2022-06-01T00:00:00.000Z",
  //         "Quantity": 10
  //       },
  //       {
  //         "Car_wash": 7,
  //         "date": "2022-06-02T00:00:00.000Z",
  //         "Quantity": 15
  //       },
  //       {
  //         "Car_wash": 8,
  //         "date": "2022-06-03T00:00:00.000Z",
  //         "Quantity": 20
  //       },
  //       {
  //         "Car_wash": 9,
  //         "date": "2022-06-04T00:00:00.000Z",
  //         "Quantity": 25
  //       },
  //       {
  //         "Car_wash": 10,
  //         "date": "2022-06-05T00:00:00.000Z",
  //         "Quantity": 30
  //       },
  //       {
  //         "Car_wash": 11,
  //         "date": null,
  //         "Quantity": null
  //       },
  //       {
  //         "Car_wash": 12,
  //         "date": "2024-05-20T00:00:00.000Z",
  //         "Quantity": 3
  //       },
  //       {
  //         "Car_wash": 13,
  //         "date": "2024-05-20T00:00:00.000Z",
  //         "Quantity": 1
  //       },
  //       {
  //         "Car_wash": 14,
  //         "date": "2024-05-20T00:00:00.000Z",
  //         "Quantity": 3
  //       }
  //     ],
  //     "message": "Successfully retrieved Carwashs"
  //   }
  fetch("/api/CarWash")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
};
const Postcarwash = (data) => {
  // this is what data must have
  // {
  //     "Quantity":11,
  //   "Date": "2024-05-20"
  //   }

  // this is waht you get back
  // {
  //     "data": {
  //       "Car_wash": 14,
  //       "date": "2024-05-20T00:00:00.000Z",
  //       "Quantity": 3
  //     },
  //     "message": "Successfully inserted data"
  //   }

  fetch("/api/CarWash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data.message);
      return "Success";
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
};

const Updatecarwash = (data) => {
  // this is what data should have atleast
  // {
  // "Car_wash": 13,
  //      "Quantity": 2
  //     }

  fetch("/api/CarWash", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data.message);
      return "Success";
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
};

const getcarwashbooking = (data) => {
  // this is what data should have atleast
  // {
  //     "Emp_ID": 85
  //   }
  // this is what comes back
  // {
  //     "data": [
  //       {
  //         "booking_id": 1,
  //         "Car_wash": 1,
  //         "Emp_ID": 85,
  //         "date": "2024-05-07T00:00:00.000Z"
  //       },
  //       {
  //         "booking_id": 2,
  //         "Car_wash": 2,
  //         "Emp_ID": 85,
  //         "date": "2024-05-07T00:00:00.000Z"
  //       },
  //       {
  //         "booking_id": 3,
  //         "Car_wash": 3,
  //         "Emp_ID": 85,
  //         "date": "2024-05-07T00:00:00.000Z"
  //       }
  //     ],
  //     "message": "Successfully retrieved Carwashs"
  //   }
  fetch(`/api/CarBookings?Emp_ID=${data.Emp_ID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
};

const deletecarwashbooking = (data) => {
    // this is what data should have atleast
    // {
    //     "booking_id": 2
    //   }
    
    fetch("/api/CarBookings", {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log("Success:", data.message);
        return "Success";
        })
        .catch((error) => {
        console.error("Error:", error);
        return "Error";
        });

};

const postcarwashbooking = (data) => {
  // this is what data should have atleast
  // {
  //     "Car_wash":2, this is the carwash id
  //     "Emp_ID": 85,
  //     "Date": "2024-05-07"
  //   }

  // { this is what comes back
  //     "data": {
  //       "booking_id": 6,
  //       "Car_wash": 2,
  //       "Emp_ID": 85,
  //       "date": "2024-05-07T00:00:00.000Z"
  //     },
  //     "message": "Successfully inserted data"
  //   }
  fetch("/api/CarBookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data.message);
      return "Success";
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
};
