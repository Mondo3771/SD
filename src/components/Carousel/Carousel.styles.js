import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";
import meal from "../../Images/Meals.svg";

//whole page
export const Wrapper = styled.section`
  padding-top: 3rem;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  width: 100vw;
  /* padding: 4rem 1rem; */
  margin: 0 auto;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* align-items: center; */

  .bookings{
    p{
      color: black;
      padding-top: 1vw;
    }
    h2{
      color: var(--dark);
    }
  }

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
    width: 0.5 rem;
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
    height:30vh;
    width: 40vw;
    //padding-top: 17rem;
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
 

/* Example CSS for hover effect on navigation buttons */
.swiper-button-next:hover,
.swiper-button-prev:hover {
  /* background-color: #dddddd; Change background color on hover */
  color: black; /* Change text color on hover */
}
.swiper-button-next,.swiper-button-prev{
  color: var(--white);
}


  .slider-controler .slider-arrow {
    background: var(--white);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    left: 42%;
    transform: translateX(-42%);
    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
/* @media (max-width: 990px) {
  .slider-controler .swiper-button-next {
    left: 70% !important;
    transform: translateX(-70%) !important;
    background-color: red; */
  }

  .slider-controler .slider-arrow ion-icon {
    font-size: 2rem;
    color: #222224;
  }

  .slider-controler .slider-arrow::after {
    content: "";
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
 background-color: ${({ isTop }) => isTop ? 'var(--darkpurple)' : 'var(--dark)'};
 /* border: ${({ isTop }) => isTop ? 'solid 5px black' : '0px'}; */
 filter: ${({ isTop }) => isTop ? 'none' : 'blur(2px)'};
  transition: filter 0.3s ease; // Add transition for smoother blur effect


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: var(--dark); */
  color: var(--white);
  //border: solid 2px rebeccapurple;
  height: 30vh;
  width: 26vw;
  border-radius: 20px;

  .textwrap {
    width: 25vw;
    height: 20vh;
    gap: 0.5rem;
    //text-align: justify;
    justify-content: center;
    padding-left: 0.5;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.5rem;
    //text-align: center;
  }

  p {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1 rem;
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    width: 60%;
  }

  button {
    width: 8vw;
    height: 20vh;
    background-color: var(--white);
    color: var(--darkest);
    border-radius: 10px;
    font-size: 1.1rem;
  }
  &:hover {
    /* background-color: var( --darkpurple); // Change to a lighter background on hover */
    transform: scale(1.05); // Scale up the card on hover
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Add a slight shadow on hover
    cursor: pointer;

  }
`;

export const Left = styled.section`
  background-image: url(${meal});
  border-radius: 20px;
  height: 68vh;
  width: 25vw;
  margin: 0;
  text-align: justify;
  padding: 2rem;

  p {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1rem;
    color: var(--darkest);
  }

  h2 {
    font-size: 3rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--dark);
    //text-align: center;
    margin-top: 15vh;
    //align-items: center;
  }

  .text {
    width: 22vw;
    height: 65vh;
    gap: 0.5rem;
    //text-align: justify;
    //justify-content: center;
    padding-left: 0.5;
    display: flex;
    flex-direction: column;
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    width: 70rem;
    padding-right: 30px;
    margin: 2rem auto;
  }
`;

export const Main = styled.section`
  background: var(--white);
  /* background-color: transparent; */
  /* backdrop-filter:blur(10px);
  -webkit-backdrop-filter: blur(10px); */
  border-radius: 30px;
  height: 80vh;
  width: 80vw;
  margin: 80px;
  text-align: justify;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  gap: 5vw;
`;

export const Swrapper = styled.section`
  background: transparent;
  height: 70vh;
  width: 65vw;
  margin: 0;
  text-align: justify;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3vh;

  h3 {
    font-size: 3rem;
    text-align: left;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--dark);
    //padding-bottom: 5vh;
    //text-align: center;
    //margin-top: 15vh;
    //align-items: center;
  }

  .text {
    width: 60 vw;
    text-align: left;

    p {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1.1rem;
      color: var(--darkest);
    }
  }
`;
