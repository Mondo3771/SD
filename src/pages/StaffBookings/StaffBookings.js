// react imports
import React, { useState } from "react";

// components
import Carousel from "../../components/Carousel/Carousel";
import StaffCarWash from "../../components/StaffCarWash/StaffCarWash";
import Modal from "../../components/Modal/Modal"; 

const StaffBookings = () => {
  // initializing the state variables
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [empBook, setEmpBook] = useState(null); 
  const[actionTriggered,setActionTriggered]=useState(false);
  // data is the employee that will be passed to the modal component
  const [data, setData] = useState(null); 


  const handleOpenModal = (booking, employee, emp, actionTriggered) => {
    // Set the selected booking state to the provided booking object
    setSelectedBooking(booking);
    // Set the data state to the provided employee object
    setData(employee);
    // Set the empBook state to the provided emp object
    setEmpBook(emp);
    // Open the modal by setting the modalOpen state to true
    setModalOpen(true);
    // Set the actionTriggered state to the provided actionTriggered value
    setActionTriggered(actionTriggered);
  };
  

  return (
    <>
    {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          data={selectedBooking}
          employee={data}
          booking={empBook && empBook.length > 0}
          setActionTriggered={setActionTriggered}
        />
      )}
      <Carousel onOpenModal={handleOpenModal}  component={<StaffCarWash onOpenModal={handleOpenModal}/>}/>
    </>
  );
};

export default StaffBookings;
