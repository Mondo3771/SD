import styled from "styled-components";
import back from "./Images/Bckgrd.svg";

export const LandingPageBack = styled.section`
  //background-image: ;
  /* background-size: cover; /* This ensures the image covers the entire background */
  /* width: 100%;
  height: 100%; */
  background-image: url(${back});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: large;
    color: white;
    margin: auto;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  h2 {
    font-size: 5rem;
    color: #bdbdbd;
    margin: auto;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 80vw;
    height: 100vh;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;

// export const tsec = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

export const Header = styled.header`
  background-color: transparent;
  width: 100vw;
  height: 7vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: white;

  .heading,
  .description,
  img {
    display: flex;
    margin: 15px;
    padding: 0;
    flex-direction: row;
    align-items: center;
    gap: 4vh;
    font-size: large;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
  }

  p {
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
  p:hover {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    text-shadow: white;
  }
`;

export const footer = styled.footer`
  background-color: #8cff8c;
  width: 100vw;
  height: 7vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: white;
`;

export const DropDown = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 25px;

  animation: leftN 0.2s ease-in-out forwards;

  @keyframes leftN {
    0% {
      transform: translateY(60%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* background-color: #7b5eb4; */
  /* background-color: #8e79b6; */
  background-color: #514d76;
  width: 100vw;
  height: 55vh;
  margin: 0;

  p {
    margin: 0;
    padding-left: 10px;
    transition: color 0.3s ease-in-out;
    text-align: left;
    align-items: center;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  p:hover {
    background-color: white;
  }
`;

export const Element = styled.article`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 55vh;
  border-right: 1px;
  border-color: white;
`;

export const Features = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: space-evenly;
  width: 25vw;
  height: 50vh;
`;

export const About = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-left: 20px;
  width: 85vw;
  height: 30vh;
`;
