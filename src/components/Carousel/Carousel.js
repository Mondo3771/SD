import {
  Wrapper,
  Card,
  Left,
  textwrap,
  MealsMain,
  Swrapper,
  PageSec,
} from "./Carousel.styles";
import React, { useState, useEffect } from "react";

//below is For the slider that displays meals
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";


import Loader from "../Loader/Loader";
import StaffHeader from "../StaffHeader/StaffHeader";
import { fetchStorageData, setLocalStorage } from "../../helper";
import { logDOM } from "@testing-library/react";

const DeleteBooking = (Booking_ID) => {//API call to delete a specific booking
  fetch(`/api/Meals?Booking_ID=${Booking_ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const Carousel = ({ onOpenModal,component:StaffCarWash }) => {//this is the componet that takes props modal and a child carwash
  const data = fetchStorageData({ key: "User" });

  const [Meals, setMeals] = useState(null);// For all meals
  const [empBook, setempBook] = useState(null);//for details of meal booking for employee
  const [selectedBooking, setSelectedBooking] = useState(null);//to pass to modal
  const [modalOpen, setModalOpen] = useState(false);//so that modal knows when to be open or closed
  const [Loaded, setLoaded] = useState(false);// to call the loader
  const [topCardIndex, setTopCardIndex] = useState(0);// specific index so that we could edit the top card of slider seperately
  const [b_ID, setb_ID] = useState(null);// booking ID
  const [delBook, setdelBook] = useState(false);// booking to delete
    console.log("fetching meals");
    fetch("/api/Meals")
      .then((response) => response.json())
      .then((meals) => {
        // console.log(meals.data, "meals");
        setMeals(meals.data);
        setLoaded(true);
      });
  };


  const [actionTriggered, setActionTriggered] = useState(false); //i want to refresh 1 second after an action

  const Book = (booking) => {// function called when we click an element on slider
    setSelectedBooking(booking);
    setModalOpen(true);
    onOpenModal(booking, data,empBook,actionTriggered);//what triggers the openeing of the modal, and this data is passed to determine what displayes on modal
    setActionTriggered(prev=>!prev);
  };
  // useEffect(() => {
  //   const fetchEmployeeMeal = () => {
  //     fetch(`/api/Meals?Emp_ID=${data.Emp_ID}`)
  //       .then((response) => response.json())
  //       .then((book) => {
  //         // console.log(book.data, "noooooooo");
  //         setempBook(book.data);
  //         setb_ID(book.data[0].Booking_ID);
  //         // console.log(book.data[0].Name_of_Meal, "meal");
  //         // console.log(book.data[0].Booking_ID, "book");
  //       });
  //   };

  //   fetchEmployeeMeal();
  // }, []);
  useEffect(() => {// fetch from booking of an employee

    console.log(fetchData());

    const fetchEmployeeMeal = () => {
      fetch(`/api/Meals?Emp_ID=${data.Emp_ID}`)
        .then((response) => response.json())
        .then((book) => {
          console.log(book.data, "noooooooo");
          setempBook(book.data);
          setb_ID(book.data[0].Booking_ID);
        })
        .catch((error) => {
          console.error("Error fetching employee meal:", error);
        });
    };

    // Initial fetch
    fetchEmployeeMeal();

    // Set up polling interval
    const intervalId = setInterval(fetchEmployeeMeal, 2000); // Poll every 2 seconds

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [data.Emp_ID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Action to be performed 1 second after modal is closed or delete button is clicked
      console.log("Action triggered 1 second later");
      const fetchEmployeeMeal = () => {
        fetch(`/api/Meals?Emp_ID=${data.Emp_ID}`)
          .then((response) => response.json())
          .then((book) => {
            console.log(book.data, "noooooooo");
            setempBook(book.data);
            setb_ID(book.data[0] ? book.data[0].Booking_ID : null);
            console.log(book.data[0].Name_of_Meal, "meal");
            console.log(book.data[0].Booking_ID, "book");
          });
      };

      fetchEmployeeMeal();

      // Reset actionTriggered state
      setActionTriggered(false);
    }, 500);

    return () => clearTimeout(timer); // Clear timeout if the component is unmounted or actionTriggered changes
  }, [actionTriggered]);

  return (
    <>
      {/* {modalOpen && (
       
        <>
         <Modal
          setOpenModal={setModalOpen}
          data={selectedBooking}
          employee={data}
          booking={empBook && empBook.length > 0}
        />
        </>

      )} */}
      {/* {modalOpen?setActionTriggered(prev=>!prev):null} */}
      <StaffHeader />

      <Wrapper>
        {Loaded ? (// if Loaded is true then do the folllowing else display the loader
          <PageSec>
            <MealsMain>
              <Left>
                <article className="text">
                  <h2>Something Healthy, Something Tasty!</h2>
                </article>
              </Left>
              <Swrapper>
                <section className="text">
                  <h3>Our Menu</h3>
                </section>
                {/* {This is what we use to create the swiper} */}
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={false}
                  slidesPerView={"1.5"}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  pagination={{ el: ".swiper-pagination", clickable: true }}
                  navigation
                  // ={{
                  //   nextEl: '.swiper-button-next',
                  //   prevEl: '.swiper-button-prev',
                  //   clickable: true,
                  // }}
                  onSlideChange={(swiper) => setTopCardIndex(swiper.realIndex)}
                  className="swiper_container"
                >
                  {Meals.map(//map through each meal from fetch
                    (
                      booking,
                      index 
                    ) => (
                      // {individual slide on slider}
                      <SwiperSlide key={index}>
                        <Card
                        aria-label="Card"
                          onClick={() => Book(booking)}
                          isTop={index === topCardIndex}
                        >
                          <section className="textwrap">
                            <h1>{booking.Name_of_Meal}</h1>
                            <p>Description: {booking.Description}</p>
                            {/* <p>Allergens: {booking.Allergens}</p> */}
                            {/* <p>Date: {booking.Date}</p> */}
                            {/* <button>Order</button> */}
                          </section>
                        </Card>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
                <section className="bookings">
                  {!(empBook && empBook.length > 0) ? (// if there is no booking then display the below text, else display the employee booking with a cancel button
                    <p>
                      Welcome to the Meals page! We take your health and
                      productivity seriously. That's why we offer a selection of
                      nutritious and delicious lunches designed to boost both
                      your energy and performance. Enjoy a delightful lunch
                      break that keeps you focused and productive throughout the
                      day. Bon appétit!
                    </p>
                  ) : (
                    <>
                      <h2>Your Booking for Today:</h2>
                      {empBook &&
                        empBook.map((meal, index) => (
                          <div key={index}>
                            <p>Meal:{meal.Name_of_Meal}</p>
                            <p>Description:{meal.Description}</p>
                            <button
                              onClick={() => {
                                DeleteBooking(meal.Booking_ID);
                                setdelBook((prev) => !prev); // Trigger state change to refresh data
                                setActionTriggered(true);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ))}

                      {/* <button onClick={DeleteBooking(b_ID)}>Cancel</button> */}
                    </>
                  )}
                </section>
              </Swrapper>
            </MealsMain>
            {/* {calling the child component StaffCarWash} */}
            {StaffCarWash}
          </PageSec>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </>
  );
};

export default Carousel;
