import React, { useState } from "react";
import {
  Wrapper,
  Card,
  Left,
  textwrap,
  Main,
  Swrapper,
} from "./Carousel.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Modal from "../Modal/Modal";

import StaffHeader from "../StaffHeader/StaffHeader";

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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const Book = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  return (
    <>
      {/* seperate component */}
      <StaffHeader></StaffHeader>
      {modalOpen && (
        <Modal setOpenModal={setModalOpen} data={selectedBooking} />
      )}

      <Wrapper>
        <Main>
          <Left>
            <section className="text">
              <h2>Something Healthy, Something Tasty!</h2>
              {/* <p>
                "Welcome to our lunch booking platform! At [Your Company Name],
                we believe that enjoying good food isn't just a pleasure—it's a
                source of energy and inspiration. Fuel your day with delicious
                meals crafted to boost your productivity and creativity. Because
                we understand that what you eat matters, and great meals make
                great workdays."
              </p> */}
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
              slidesPerView={"1"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              className="swiper_container"
            >
              {mock.map((booking, index) => (
                <SwiperSlide key={index}>
                  <Card onClick={() => Book(booking)}>
                    <section className="textwrap">
                      <h1>{booking.Meal}</h1>
                      <p>Description: {booking.Description}</p>
                      <p>Allergens: {booking.Allergens}</p>
                      <p>Date: {booking.Date}</p>
                      {/* <button>Order</button> */}
                    </section>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            <section className="text">
              <p>
                Welcome to the Meals page! We take your health and productivity
                seriously. That's why we offer a selection of nutritious and
                delicious lunches designed to boost both your energy and
                performance. Enjoy a delightful lunch break that keeps you
                focused and productive throughout the day. Bon appétit!
              </p>
            </section>
          </Swrapper>
        </Main>

        {/* <section className='Right'> */}

        {/* </section> */}
      </Wrapper>
    </>
  );
};

export default Carousel;
