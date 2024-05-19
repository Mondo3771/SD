import styled from "styled-components";
import back from "../../Images/Bckgrd.svg";

export const LandingPageBack = styled.section`
  background-image: url(${back});
  background-size: cover;
  background-position: left;
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
    font-size: 4rem;
    color: #bdbdbd;
    margin: auto;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .open {
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 3.5rem;

    font-weight: bold;
    color: #bdbdbd;
    gap: 3vh;
    margin: auto;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    align-items: center;
    text-align: center;
    width: 80vw;
    height: 100vh;
    max-height: 100vh;
    text-align: center;
  }
  .text {
    font-size: 5rem;
    /* font-style: bold; */
    font-weight: bold;
    color: #bdbdbd;
    gap: 3vh;
    margin: auto;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

    align-items: center;
    text-align: center;
    width: 80vw;
    height: 100vh;
    max-height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 480px) {
    background-size: cover;
    background-position: left;
    gap: 3vh;
    height:  100vh;
    width: 100vw;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: medium;
      color: white;
      margin: auto;
      text-align: center;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    h2 {
      font-size: 3rem;
      color: #bdbdbd;
      margin: auto;
      text-align: center;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .open {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 1rem;

      font-weight: bold;
      color: #bdbdbd;
      gap: 1vh;
      margin: auto;
      font-family: Verdana, Geneva, Tahoma, sans-serif;

      align-items: center;
      text-align: center;
      width: 98vw;
      height: 100vh;
      max-height: 100vh;
      text-align: center;
    }

    .text {
      font-size: 3rem;
      /* font-style: bold; */
      font-weight: bold;
      color: #bdbdbd;
      gap: 3vh;
      margin: auto;
      font-family: Verdana, Geneva, Tahoma, sans-serif;

      align-items: center;
      text-align: center;
      width: 80vw;
      height: 100vh;
      max-height: 100vh;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 760px) {
    .open {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 2rem;

      font-weight: bold;
      color: #bdbdbd;
      gap: 1vh;
      margin: auto;
      font-family: Verdana, Geneva, Tahoma, sans-serif;

      align-items: center;
      text-align: center;
      width: 98vw;
      height: 100vh;
      max-height: 100vh;
      text-align: center;
    }
  }
`;

export const Header = styled.header`
  background-color: transparent;
  width: 100vw;
  height: 7vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;

  .heading  {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1 {
      font-size: x-large;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    img {
      width: 100px;
      height: 40px;
    }
  }

  .description {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: large;
    gap: 4vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  /* .heading, */
  img {
    //margin: 15px;
    padding: 0;
    flex-direction: row;
    align-items: center;
    gap: 4vh;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
  }

  p {
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-align: justify;
  }
  p:hover {
    color: pink;
    text-shadow: white;
  }

  ///////////////////
  //media queries for phones
  @media screen and (max-width: 480px) {
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .heading {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      h1 {
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      img {
        width: 70%;
        height: 70%;
      }
    }

    .description {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: medium;
      gap: 2vh;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }

  @media screen and (max-width: 760px) {
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .heading {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      h1 {
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      img {
        width: 70%;
        height: 70%;
      }
    }

    .description {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: medium;
      gap: 2vh;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
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

  background-color: #514d76;
  width: 100vw;
  height: fit-content;
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
  img {
    padding-top: 3vh;
  }

  @media only screen and (max-width: 480px) {
    //display: flex;
    //flex-direction: grid;
    display: grid;
    //flex-direction: column;
    grid-template-columns: 1fr 1fr;
    border-radius: 25px;
    background-color: #514d76;
    width: 100%;
    height: 90%;

    p {
      margin: 0;
      //padding-left: 10px;
      transition: color 0.3s ease-in-out;
      text-align: left;
      align-items: center;
      color: white;
      font-size: small;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    img {
      width: 80%;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 760px) {
    //display: flex;
    //flex-direction: grid;
    display: grid;
    //flex-direction: column;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 25px;
    background-color: #514d76;
    width: 100%;
    height: 90%;

    p {
      margin: 0;
      //padding-left: 10px;
      transition: color 0.3s ease-in-out;
      text-align: left;
      align-items: center;
      color: white;
      font-size: small;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    img {
    }
  }
`;

export const Element = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 60%;
  border-right: 1px;
  border-color: white;
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    margin-bottom: 1vh;

    img {
      width: 100%;
      height: 100%;
    }
  }
  @media only screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    margin-bottom: 1vh;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Features = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  text-align: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  //border-right: solid white 3px;
  P {
    padding-top: 0;
    justify-content: center;
    text-align: center;
    color: white;
    padding-left: 5vh;
    padding-right: 5vh;
  }
  img {
    height: 30vh;
  }
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1vw;
    P {
      padding-top: 0;
      justify-content: center;
      text-align: left;
      color: white;
      padding-left: 1vh;
      padding-right: 1vh;
    }
    img {
      height: 13vh;
      width: 80%;
      padding-top: 1vh;
      padding-bottom: 1vh;
    }
  }
  @media only screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1vw;
    P {
      padding-top: 0;
      justify-content: center;
      text-align: left;
      color: white;
      padding-left: 1vh;
      padding-right: 1vh;
    }
    img {
      height: 10vh;
      width: 80%;
      padding-top: 1vh;
      padding-bottom: 1vh;
    }
  }
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

  p {
    color: white;
  }
  @media only screen and (max-width: 480px) {
    display: flex;
    flex-direction: row;
    width: 96vw;
    height: 30vh;
    p {
      color: white;
      font-size: 0.8rem;
      width: 100%;
      height: 100%;
      padding-right: 1vh;
      padding-top: 1vh;
    }
    img {
      width: 45vw;
      height: 20vh;
    }
  }
  @media only screen and (max-width: 760px) {
    display: flex;
    flex-direction: row;
    width: 96vw;
    height: 30vh;
    p {
      color: white;
      font-size: 0.8rem;
      width: 100%;
      height: 100%;
      padding-right: 1vh;
      padding-top: 1vh;
    }
    img {
      width: 45vw;
      height: 20vh;
    }
  }
`;
