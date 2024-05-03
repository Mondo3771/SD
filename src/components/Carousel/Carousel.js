
import React, { useState } from 'react';
import { Wrapper, Card ,Left} from './Carousel.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Modal from '../Modal/Modal';

import StaffHeader from '../StaffHeader/StaffHeader';


const mock = [
  {
    "Meal": "pizza",
    "Date": "20/03/2121",
    "Available": true
  },
  {
    "Meal": "burger",
    "Date": "21/03/2121",
    "Available": true
  },
  {
    "Meal": "sushi",
    "Date": "22/03/2121",
    "Available": false
  },
  {
    "Meal": "spaghetti",
    "Date": "23/03/2121",
    "Available": true
  },
  {
    "Meal": "salad",
    "Date": "24/03/2121",
    "Available": false
  },
  {
    "Meal": "steak",
    "Date": "25/03/2121",
    "Available": true
  },
  {
    "Meal": "sandwich",
    "Date": "26/03/2121",
    "Available": true
  }
];

const Carousel = () => {

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const Book = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);

  }

  


  return (<>
  {/* seperate component */}
  <StaffHeader></StaffHeader> 

    
    <Wrapper>
    <Left></Left>
          <>
         
       {/* <section className='Right'> */}
       {modalOpen && <Modal setOpenModal={setModalOpen} data={selectedBooking} />}


          
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'2'}
            coverflowEffect={{

              rotate: 0,
              stretch: 30,
              depth: 100,
              modifier: 2.5

            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}


            navigation
            ={{

              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,


            }}


            className="swiper_container"
          >

                    {mock.map((booking, index) => (
                      <SwiperSlide key={index}>
                        <Card onClick={() => Book(booking)}>
                          <h1>{booking.Meal}</h1>
                        </Card>
                      </SwiperSlide>
                    ))}
            </Swiper>
            {/* </section> */}
              </>
              


        
        
        

    </Wrapper>
    
    
    </>

  );
}

export default Carousel;

