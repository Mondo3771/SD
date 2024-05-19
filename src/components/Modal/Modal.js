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
                  <p> {data.Day}: {data.Date.split(' ')[0]}</p>
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
