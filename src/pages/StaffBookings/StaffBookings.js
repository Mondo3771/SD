import React, { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import StaffCarWash from "../../components/StaffCarWash/StaffCarWash";
import Modal from "../../components/Modal/Modal"; // Assuming this is the path to your Modal component

const StaffBookings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [data, setData] = useState(null); // Assuming `data` is the employee data you want to pass
  const [empBook, setEmpBook] = useState([]); // Assuming `empBook` is some bookings array
  const[actionTriggered,setActionTriggered]=useState(false);

  const handleOpenModal = (booking, employee,emp,actionTriggered) => {
    setSelectedBooking(booking);
    setData(employee);
    setEmpBook(emp)
    setModalOpen(true);
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
