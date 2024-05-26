// styled components
import styled from "styled-components";
// background
import newback from "../../Images/Bckgrd.svg";
// react
import React from "react";

export const Header = styled.header`
  position: sticky;
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 12vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .logout button {
    background: inherit;
    border: none;
    color: aliceblue;
  }

  .logo {
    display: flex;
  }

  a {
    font-size: 1.35rem;
    text-decoration: none;
    color: white;
    transition: all 200 ease-in-out;
  }

  ul {
    display: flex;
    padding: 0;
    list-style: none;
    gap: 5rem;
    color: white;
  }

  a:visited {
    color: white;
  }

  li a:hover {
    color: var(--white);
  }

  @media (max-width: 768px) {
    a {
      font-size: 0.8rem;
    }
    ul {
      gap: 1rem;
    }
    .logoPic {
      width: 30px;
    }
  }
`;

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  background-image: url(${newback});
  background-size: cover;
  background-position: top;
  height: 100vh;
  gap: 1rem;
  overflow-x: hidden;

  .title {
    margin-left: 4vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    font-size: 2rem;
  }

  .container {
    display: flex;
    width: 90vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 2vw;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.5rem;
    }
    .container {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const Card = styled.section`
  display: grid;
  gap: 5vw;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  flex: 0.7;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  /* max-height: 60vh; */
  height: 380px;
  color: var(--white);
  align-items: center;
  padding: 30px;
  overflow-y: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  max-width: 60vw;
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid white;
  :hover {
    cursor: pointer;
    background-color: var(--darkpurple);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    flex: 1;
  }
`;

export const CreateMealCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30vw;
  height: 400px;
  color: var(--dark);
  flex: 0.3;
  margin: 0 20px;
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: transparent;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow-y: auto;
  overflow: hidden;
  max-width: 63vw;

  h2,
  p {
    color: var(--white);
  }

  .input {
    height: 6vh;
    font-size: 1.1rem;
    width: 17vw;
    border-radius: 15px;
    font-family: inherit;
    background-color: var(--white);
    color: var(--darkest);
    padding: 0 5px;
  }

  .available {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      width: 2vw;
      height: 2vh;
    }
  }
  ::placeholder {
    font-family: inherit;
    color: rgba(0, 0, 0, 0.4);
    font-size: 1.1rem;
    text-align: left;
    align-items: center;
  }

  button {
    width: 7vw;
    height: 5vh;
    border-radius: 10px;
    background-color: var(--dark);
    color: var(--white);
    font-weight: bold;
  }

  p {
    font-weight: bold;
  }

  label {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    /* width: 50%; */
    flex: 1;

    h2 {
      font-size: 1.3rem;
      margin: 0.5rem 0;
    }
    button {
      width: 70px;
      margin: 0;
      padding: 5px;
    }
    .input {
      padding: 1px 5px;
      width: 100%;
    }

    ::placeholder {
      font-size: 0.9rem;
    }
  }
`;

export const MealCard = styled.article`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  border-radius: 10px;
  padding: 2vw;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

export const ShowMealCard = styled.article`
  display: flex;
  width: 40vw;
  height: 360px;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--white);
  flex: 0.3;
  margin: 0 20px;
  border: 1px solid white;
  padding: 40px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: var(--dark);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  overflow-y: hidden;

  button {
    border-radius: 10px;
    width: 8vw;
    height: 5vh;
    font-size: 1rem;
    background-color: var(--white);
    color: var(--dark);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .trashIcon,
  .backIcon {
    width: 25px;
  }

  .available {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      width: 2vw;
      height: 2vh;
    }

    h3 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    height: 180px;
    font-size: 0.65rem;
    flex: 0.7;

    button {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      font-size: 0.65rem;
    }

    .trashIcon,
    .backIcon {
      width: 15px;
      height: 15px;
    }

    p {
      font-size: 0.5rem;
    }
    h3 {
      margin: 0;
    }
  }
`;


export const MealCardFin = ({ meal, click }) => (
  <MealCard
    key={meal.Meal_Id}
    onClick={() => click(meal)}
    data-testid={`MealCard-${meal.Meal_ID}`}
  >
    <h3>{meal.Name_of_Meal}</h3>
    <p>{meal.Description}</p>
    <p>{meal.Availability ? "Available" : "Not Available"}</p>
  </MealCard>
);

export const MockMeals = [
  {
    Meal_Id: 1,
    Name_of_Meal: "Masala",
    Availability: true,
    Description: "lorem ipsum dolor sit amet dolor",
  },
  {
    Meal_Id: 2,
    Name_of_Meal: "Masala",
    Availability: true,
    Description: "lorem ipsum dolor sit amet dolor",
  },
];
