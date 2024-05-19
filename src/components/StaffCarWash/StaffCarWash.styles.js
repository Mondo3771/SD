import styled from "styled-components";
import carwashimg from "../../Images/Carwash.svg";
export const Wrapper = styled.main`
  // background: var(--white);
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  /* border-radius: 30px; */
  height: 80vh;
  width: 80vw;
  //margin: 80px;
  align-items: center;
  text-align: justify;
  padding: 2rem;
  display: flex;
  flex-direction: row-reverse;
  gap: 5vw;

  justify-content: center;
`;
export const ImageSec = styled.section`
  background-image: url(${carwashimg});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  height: 68vh;
  width: 25vw;
  margin: 0;
  text-align: justify;
  padding: 2rem;

  h3 {
    display: flex;
    flex-direction: row;
    font-size: 3rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    align-items: center;
    justify-content: center;
    margin-top: 25vh;
  }
`;

export const Weather = styled.section`
  /* border: 2px solid;
  border-color: var(--dark);
  border-radius: 20px; */

  padding-top: 3vh;
  align-items: center;
  height: 22vh;
  width: 23vw;
  border-radius: 10%;
  font-size: 1rem;
  .MapPinIcon {
    width: 0.1 vw;
    height: 0.1 vh;
  }
  .WeatherText {
    background-color: var(--white);
    border-radius: 10%;
    margin: 1vh;
    padding: 1vw;
    width: fit-content;
    height: fit-content;
    gap: 3rem;
    text-align: center;

    p {
      color: var(--dark);
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1.1rem;
      padding: 1vh;
    }
    h2 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1.5rem;
      color: var(--dark);
    }
    h5 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 1rem;
      color: var(--dark);
      padding: 0;
      margin: 0;
    }
    h6 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: 2rem;
      color: var(--dark);
      font-weight: 0;
      padding: 0;
      margin: 0;
    }
  }
  //background-color: red;
`;
export const Text = styled.section`
  padding: 2vh;
  align-items: center;
  height: 22vh;
  width: 25vw;
  border-radius: 10%;
`;
export const Right = styled.body`
  display: flex;
  flex-direction: column;
  gap: 10vh;
`;
export const Booking = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.1rem;
  h4 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
    color: var(--white);
  }
`;

export const WeatherSec = styled.section`
  height: 35vh;
  width: 45vw;
  //background-color: red;
  display: flex;
  flex-direction: row;

  .text {
    height: 35vh;
    width: 23vw;
    font-size: 1rem;
    color: var(--dark);
    //background: blue;
  }

  h5 {
    font-size: 3rem;
    text-align: left;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    width: 10vw;
  }

  li {
    font-size: 1.2rem;
    color: var(--white);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding: 1vh;
  }
`;
export const Card = styled.article`
  height: 30vh;
  width: 20vw;
  //background-color: #9b67a8;
  background-color: var(--dark);
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6vh;

  button {
    height: 4vh;
    width: 7vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1rem;

    :hover {
      background-color: var(--darkest);
      cursor: pointer;
    }
  }
`;
