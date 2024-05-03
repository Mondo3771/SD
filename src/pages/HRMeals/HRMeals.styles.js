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
    flex-direction: start;
    text-align: left;
    padding-left: 10vw;
    width: 80vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    font-size: 1.5rem;
  }

  .container {
    display: flex;
  }
`;

export const Card = styled.article`
  display: grid;
  gap: 50px;
  // row-gap: 50px;
  // column-gap: 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  flex: 0.6;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  max-height: 50vh;
  color: var(--white);
  padding: 40px;
  margin: 0 20px;
  overflow-y: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid white;
`;

export const CreateMealCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--white);
  flex: 0.4;
  margin: 0 20px;
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow-y: auto;

  .input {
    width: 200px;
  }

  .available {
    display: flex;
    gap: 0.5rem;
  }

  button {
    width: 100px;
    height: 50px;
    border-radius: 40px;
  }
`;

export const MealCard = styled.article`
  border: 1px solid white;
  display: flex;
  width: 250px;
  flex-direction: column;
`;

export const ShowMealCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--white);
  flex: 0.4;
  margin: 0 20px;
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow-y: auto;
`;
