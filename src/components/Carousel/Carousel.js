import {
  Wrapper,
  Card,
  Left,
  textwrap,
  Main,
  Swrapper,
} from "./Carousel.styles";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import StaffHeader from "../StaffHeader/StaffHeader";
import { useActionData } from "react-router";

const mock = [
  {
    Meal: "Pizza",
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
    Date: "20/03/2121",
    Available: true,
  },
  {
    Meal: "burger",
    Date: "21/03/2121",
    Available: true,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
  {
    Meal: "sushi",
    Date: "22/03/2121",
    Available: false,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
  {
    Meal: "spaghetti",
    Date: "23/03/2121",
    Available: true,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
  {
    Meal: "salad",
    Date: "24/03/2121",
    Available: false,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
  {
    Meal: "steak",
    Date: "25/03/2121",
    Available: true,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
  {
    Meal: "sandwich",
    Date: "26/03/2121",
    Available: true,
    Description:
      "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
    Allergens: "Contains Milk",
  },
];

const Carousel = () => {
  const location = useLocation();
  const data = location.state.params;


  // console.log(data);

  const [Meals, setMeals] = useState(null);
  const[empBook,setempBook]=useState(
  
    null
  );
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [Loaded, setLoaded] = useState(false);
  const [topCardIndex, setTopCardIndex] = useState(0); // State to track the index of the top card


  const Book = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };
  useEffect(() => {
    const fetchData = () => {
      fetch("/api/Meals")
        .then((response) => response.json())
        .then((meals) => {
          setMeals(meals.data);
          setLoaded(true);
        });
      // setLoaded(true);
    };

    const Employee_meal = () => {
      fetch(`/api/Meals?Emp_ID=${data.Emp_ID}`)
        .then((response) => response.json())
        .then((book) => {
          console.log(book.data)
          setempBook(book.data)
        });
    };
    fetchData();
    Employee_meal();
  }, []);

  // const data={
  //   EMP_id:1,
  //   Meal_id:12


  // }


  return (
    <>
      <StaffHeader employee={data}></StaffHeader>
      {modalOpen && (
        <Modal setOpenModal={setModalOpen} data={selectedBooking} employee={data} booking={empBook && empBook.length > 0}/>
      )}

      <Wrapper>
        {Loaded ? (
          <Main>
            <Left>
              <section className="text">
                <h2>Something Healthy, Something Tasty!</h2>
               
              </section>
            </Left>{" "}
            <Swrapper>
              <section className="text">
                <h3>Our Menu</h3>
              </section>

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
                {mock.map((booking, index) => (//change
                  <SwiperSlide key={index}>
                    <Card onClick={() => Book(booking)} isTop={index === topCardIndex}>
                      <section className="textwrap">
                        <h1>{booking.Meal}</h1>
                        <p>Description: {booking.Description}</p>
                        {/* <p>Allergens: {booking.Allergens}</p> */}
                        {/* <p>Date: {booking.Date}</p> */}
                        {/* <button>Order</button> */}
                      </section>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
              <section className="bookings">
                {!(empBook && empBook.length > 0)?
                <p>
                  Welcome to the Meals page! We take your health and
                  productivity seriously. That's why we offer a selection of
                  nutritious and delicious lunches designed to boost both your
                  energy and performance. Enjoy a delightful lunch break that
                  keeps you focused and productive throughout the day. Bon
                  appétit!
                </p>
                :
                <>
                    
               <h2>Your Booking for Today:</h2>
                
                
                {empBook &&
                  empBook.map((meal,index) => (
                    <div key={index}>
                      <p>Meal:{meal.Name_of_Meal}</p>
                      <p>Description:{meal.Description}</p>
                    </div>
                  ))
                }
                </>
            

              }

                  

                  
              </section>
            </Swrapper>
          </Main>
        ) : (
          <Loader></Loader>
        )}
      </Wrapper>
    </>
  );


};

export default Carousel;