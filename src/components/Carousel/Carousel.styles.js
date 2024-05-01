import styled from "styled-components";

export const Wrapper=styled.section`
padding-top: 7rem;

max-width: 84rem;
  /* padding: 4rem 1rem; */
  margin: 0 auto;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* align-items: center; */


*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
}


@media (min-width: 1440px) {
  html {
    zoom: 1.5;
  }
}

@media (min-width: 2560px) {
  html {
    zoom: 1.7;
  }
}

@media (min-width: 3860px) {
  html {
    zoom: 2.5;
  }
}

::-webkit-scrollbar {
  width: 1.3rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: #797979;
  transition: all 0.5s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  background: #222224;
}

::-webkit-scrollbar-track {
  background: #f9f9f9;
}





.heading {
  padding: 1rem 0;
  font-size: 3.5rem;
  text-align: center;
}

.swiper_container {
  height: 52rem;
  padding-top: 17rem;
  /* position: relative; */
  position: relative;

}

.swiper-slide {
  width: 37rem;
  height: 42rem;
  position: relative;
}

@media (max-width: 500px) {
  .swiper_container {
    height: 47rem;
  }
  .swiper-slide {
    width: 28rem !important;
    height: 36rem !important;
  }
  .swiper-slide img {
    width: 28rem !important;
    height: 36rem !important;
  }
}

.swiper-slide img {
  width: 37rem;
  height: 42rem;
  border-radius: 2rem;
  object-fit: cover;
}

.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}

.slider-controler {
  position: relative;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-controler .swiper-button-next {
  left: 58% !important;
  transform: translateX(-58%) !important;
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-next {
    left: 70% !important;
    transform: translateX(-70%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-next {
    left: 80% !important;
    transform: translateX(-80%) !important;
  }
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-prev {
    left: 30% !important;
    transform: translateX(-30%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-prev {
    left: 20% !important;
    transform: translateX(-20%) !important;
  }
}

.slider-controler .slider-arrow {
  background: var(--white);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 42%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.slider-controler .slider-arrow ion-icon {
  font-size: 2rem;
  color: #222224;
}

.slider-controler .slider-arrow::after {
  content: '';
}

.swiper-pagination {
  position: relative;
  width: 15rem !important;
  bottom: 1rem;
}

.swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: var(--primary);
}

`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: wheat;
  border: solid 2px rebeccapurple;
  height: 12rem;
  width: 22rem;
  border-radius: 20px;

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    width: 60%;
  }
`;

export const Left = styled.section`
  background-color: red;
  height: 400px;
  width: 45%;
  margin: 80px;

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    width: 70rem;
    padding-right:30px;
    margin: 2rem auto;
  }
`;