import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, data }) {
  const confirmBooking = () => {
    //insert into databse
    setOpenModal(false);
  };

  return (
    <main className="modalBackground">
      <section className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <h2>{data.Meal}</h2>
        <p>Description: {data.Description}</p>
        {/* <p>Available: {data.Available ? "Yes" : "No"}</p> */}
        <section className="section">
          <button onClick={confirmBooking}>Confirm Booking</button>
        </section>
      </section>
    </main>
  );
}

export default Modal;
