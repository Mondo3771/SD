import React from "react";
import "./Modal.css";


function Modal({ setOpenModal, data, employee, booking, setActionTriggered }) {//each of these passed to the modal
  console.log(booking, "modal");
  const confirmBooking = () => {//post for a meal booking when employee clicks confirm
    const PostBooking = (Emp_ID, Meal_ID) => {
      fetch(`/api/Meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Emp_ID: Emp_ID,
          Meal_ID: Meal_ID,
          Date_of_booking: new Date().toISOString(),//changing the format of the date
        }),
      })
        .then((response) => response.json())
        .then((book) => {
          console.log(book.data, "hey");
          setActionTriggered((prev) => prev);
        });
    };
    // console.log(data.Meal_ID);
    PostBooking(employee.Emp_ID, data.Meal_ID);

    setOpenModal(false);// closing the modal
  };
  const confirmCarBooking = () => {// post car wash booking
    const postcarwashbooking = (info) => {
      fetch("/api/CarBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((response) => response.json())
        .then((book) => {
          const Updatecarwash = (data) => {// to update the quantity when  a user confirms their carwash booking
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
                return "Success";
              })
              .catch((error) => {
                console.error("Error:", error);
                return "Error";
              });
          };
          console.log(info);
          console.log({ Car_wash: info.Car_wash, Quantity: data.Quantity - 1 });
          Updatecarwash({
            Car_wash: info.Car_wash,
            Quantity: data.Quantity - 1,
          });
          console.log("Success:", data.message);
          setActionTriggered((prev) => prev);

          return "Success";
        })
        .catch((error) => {
          console.error("Error:", error);
          return "Error";
        });
    };
    postcarwashbooking({//calling it with this information for API call
      Car_wash: data.Car_wash,
      Emp_ID: employee.Emp_ID,
      Date: data.Date,
    });
    setOpenModal(false);// close modal
  };

  return (
    <main className="modalBackground">
      {/* {covers whole background and blurs out} */}
      <section className="modalContainer">
              {/* Body of Modal */}

        {booking ? (// if there is a booking say you have a booking
          <>
            <article className="already">
              <p className="already">You already have a booking</p>
              <button aria-label="Close"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Close
              </button>
            </article>
          </>
        ) : (
          <>
            {" "}
            {console.log(booking, "no ways hoza")}
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            {data.Description ? (// this is to differetiate what data to be displayed from either car wash or meal booking, data.Descriptions does not exist for car wash
              <>
                <h2>{data.Name_of_Meal}</h2>
                <p>Description: {data.Description}</p>
                <section className="section">
                  <button onClick={confirmBooking} aria-label="Confirm">
                    Confirm Booking
                  </button>
                </section>
              </>
            ) : (
              <>
                {data.Quantity === 0 ? (// this is to display not available if it is is fully booked
                  <>
                    <article className="already">
                      <p className="already">
                        There is no available carwash for this day
                      </p>
                      <button
                        onClick={() => {
                          setOpenModal(false);
                        }}
                      >
                        Close
                      </button>
                    </article>
                  </>
                ) : (
                  <>
                    <h2>Car Wash Booking</h2>
                    <p>
                      {" "}
                      {data.Day}: {data.Date}
                    </p>
                    <p>Quantity left:{data.Quantity}</p>

                    <section className="section">
                      <button aria-label="Confirm" onClick={confirmCarBooking}>
                        Confirm Booking
                      </button>
                    </section>
                  </>
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Modal;
