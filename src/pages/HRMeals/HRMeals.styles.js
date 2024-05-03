import styled from "styled-components";
import newback from "../../pages/HRHome/Images/Bckgrd.svg";

export const Header = styled.header`
  position: sticky;
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

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
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${newback});
  background-size: cover;
  background-position: top;
  height: 100vh;
  gap: 1rem;

  .titlepage {
    display: flex;
    flex-direction: left;
    text-align: left;
    padding-left: 4vw;
    width: 40vw;
    height: 5vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    font-size: 1.5rem;
  }

  .container {
    display: flex;
    width: 95vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 2vw;
  }
`;

export const Card = styled.article`
  display: grid;
  gap: 5vw;
  // row-gap: 50px;
  // column-gap: 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  flex: 0.7;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  max-height: 50vh;
  color: var(--white);
  align-items: center;
  padding: 30px;
  //margin: 0 20px;
  overflow-y: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  max-width: 60vw;
  //background-color: #31174b;//dark purple
  background-color: var(--white);
  /* backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); */
  border: 1px solid white;
`;

export const CreateMealCard = styled.div`
  display: flex;
  flex-direction: column;
  //width: 12vw;
  gap: 0.5rem;
  width: 30vw;
  height: 53vh;
  color: var(--dark);
  flex: 0.3;
  margin: 0 20px;
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: var(--white);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); */
  overflow-y: auto;

  .input {
    width: 20vw;
    height: 3vh;
    border-radius: 10px;
  }

  .available {
    display: flex;
    gap: 0.5rem;
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
`;

export const MealCard = styled.article`
  border: 1px solid white;
  display: flex;
  /* width: 20vw; */
  flex-direction: column;
  background-color: var(--dark);
  border-radius: 10px;
  padding: 2vw;
`;

export const ShowMealCard = styled.article`
  display: flex;
  width: 40vw;
  height: 48vh;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--white);
  flex: 0.2;
  margin: 0 20px;
  border: 1px solid white;
  padding: 40px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: var(--dark);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  overflow-y: auto;

  button {
    border-radius: 10px;
    width: 7vw;
    height: 4vh;
    background-color: var(--white);
    color: var(--dark);
  }

  h3 {
    font-size: 1.2rem;
  }
`;
