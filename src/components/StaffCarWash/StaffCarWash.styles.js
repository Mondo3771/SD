import styled from "styled-components";
import carwashimg from "../../Images/Carwash.svg";

export const Wrapper = styled.main`
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 80vh;
  width: 80vw;
  align-items: center;
  text-align: justify;
  padding: 2rem;
  display: flex;
  flex-direction: row-reverse;
  gap: 5vw;
  justify-content: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 95vw;
    gap: 2vw;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
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

  @media (max-width: 1200px) {
    width: 60vw;
    height: 40vh;
    h3 {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 30vh;
    h3 {
      font-size: 1.5rem;
    }
  }
`;

export const Weather = styled.section`
  padding-top: 3vh;
  align-items: center;
  height: 22vh;
  width: 23vw;
  border-radius: 10%;
  font-size: 1rem;

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

  @media (max-width: 1200px) {
    width: 60vw;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 80%;
    .WeatherText {
      p,
      h2,
      h5,
      h6 {
        font-size: 1rem;
      }
    }
  }
`;

export const Text = styled.section`
  padding: 2vh;
  align-items: center;
  height: 22vh;
  width: 25vw;
  border-radius: 10%;

  @media (max-width: 1200px) {
    width: 60vw;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;

  @media (max-width: 1200px) {
    align-items: center;
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
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

  @media (max-width: 1200px) {
    /* flex-direction: column; */
    gap: 2rem;
  }
`;

export const WeatherSec = styled.section`
  height: 35vh;
  width: 45vw;
  display: flex;
  flex-direction: row;

  .text {
    height: 35vh;
    width: 23vw;
    font-size: 1rem;
    color: var(--dark);
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

  @media (max-width: 1200px) {
    flex-direction: column;
    height: auto;
    .text {
      width: 60vw;
      h5 {
        font-size: 2rem;
      }
      li {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    justify-content: center;
    .text {
      width: 80vw;
    }
  }
`;

export const Card = styled.article`
  height: 30vh;
  width: 20vw;
  background-color: var(--dark);
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;

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

  @media (max-width: 1200px) {
    width: 60vw;
    height: 20vh;
    button {
      width: 50vw;
    }
  }

  @media (max-width: 768px) {
    width: 80vw;
    height: 15vh;
    button {
      width: 60vw;
    }
  }
`;
