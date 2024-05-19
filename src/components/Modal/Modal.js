import React from "react";
import "./Modal.css";

// import { PostBooking } from "../Carousel/fetch";

function Modal({ setOpenModal, data, employee, booking ,setActionTriggered}) {
  const confirmBooking = () => {
    const PostBooking = (Emp_ID, Meal_ID) => {
      fetch(`/api/Meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Emp_ID: Emp_ID,
          Meal_ID: Meal_ID,
          Date_of_booking: new Date().toISOString(),
        }),
      })
        .then((response) => response.json())
        .then((book) => {
          console.log(book.data, "hey");
          setActionTriggered(prev=>prev);
          
        });
    };
    // console.log(data.Meal_ID);
    PostBooking(employee.Emp_ID, data.Meal_ID);

    setOpenModal(false);
  };
  const confirmCarBooking=()=>{
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
      fetch("/api/CarWashBooking", {
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
    postcarwashbooking({Car_wash:data.Car_wash,Emp_ID:employee.Emp_ID, Date:data.Date})
    setOpenModal(false);


  }

  return (
    <main className="modalBackground">
      <section className="modalContainer">
        {booking ? (
          <>
            <article className="already">
              <p className="already">You already have a booking</p>
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
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            {data.Description?(
            <>
            
            <h2>{data.Name_of_Meal}</h2>
            <p>Description: {data.Description}</p>
            <section className="section">
              <button onClick={confirmBooking}>Confirm Booking</button>
            </section>
              </>
            )
            :
            (
              <>
              {data.Quantity===0?
              (
                <>
                <article className="already">
                  <p className="already">There is no available carwash for this day</p>
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Close
                  </button>
                </article>
              </>
              )
              :(

                <>
                  <h2>Car Wash Booking</h2>
                  <p> {data.Day}: {data.Date}</p>
                  <p>Quantity left:{data.Quantity}</p>

                  <section className="section">
                  <button onClick={confirmCarBooking}>Confirm Booking</button>
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
