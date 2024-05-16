import styled from "styled-components";
import meal from "../../Images/Meals.svg";
import carwash from "../../Images/Carwash.svg";
export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
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
export const ImageSec = styled.section`
  background-image: url(${carwash});
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
  h2,
  p {
    color: var(--dark);
  }
  border: 2px solid;
  border-color: var(--dark);
  border-radius: 20px;
  padding: 2vh;
  align-items: center;
  height: 30vh;
  width: 20vw;
  border-radius: 10%;
  font-size: 1.1rem;
`;
export const Text = styled.section`
  height: 30vh;
  width: 20vw;
  font-size: 3.1rem;
`;
export const Main = styled.body`
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

export const Card = styled.article`
  height: 30vh;
  width: 20vw;
  background-color: var(--darkpurple);
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    height: 5vh;
    width: 7vw;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    :hover {
      background-color: var(--darkest);
      cursor: pointer;
    }
  }
`;
