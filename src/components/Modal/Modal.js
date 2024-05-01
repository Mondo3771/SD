import React from "react";
import "./Modal.css";

function Modal({ setOpenModal,data }) {
  const confirmBooking=()=>{
    //insert into databse
    setOpenModal(false);

  }


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
          <p>Date: {data.Date}</p>
          <p>Available: {data.Available ? 'Yes' : 'No'}</p>
          <button onClick={confirmBooking}>
              Confirm Booking
          </button>
       
      </section>
    </main>
  );
}

export default Modal;