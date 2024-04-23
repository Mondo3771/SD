import styled from "styled-components";
import background from "./background.svg";

export const LandingPageContainer = styled.main`
  background-image: url(${background});
  background-size: cover; /* This ensures the image covers the entire background */
`;

export const Wrapper = styled.section`
  background-color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;

export const Header = styled.header`
  position: fixed;
  background: linear-gradient(to top, black, blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  z-index: 1000;
  color: white;

  h1 {
    margin-left: 100px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  button {
    border: none;
    background-color: transparent;
    margin-right: 100px;
  }
`;

export const Card = styled.article`
  border-radius: 50px;
  color: aliceblue;
  background-color: var(--whiter);
  height: 80%;
  width: 900px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .top {
    margin: 0;
    width: fit-content;
    height: fit-content;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    h1 {
      color: var(--darkest);
      font-size: 70px;
      height: fit-content;
    }
  }

  .bottom {
    width: fit-content;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .login {
    margin-top: 30px;
    background-color: var(--darkest);
    height: 8vh;
    width: 50vh;
    border-radius: 50px;
    color: wheat;
  }
  .sign,
  .log {
    background-color: var(--dark);
    height: 8vh;
    width: 30vh;
    margin-bottom: 5px;

    border-radius: 50px;
    color: white;
  }

  .secSign,
  .secLog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
    width: 100%;
    gap: 10px;
    color: var(--darkest);
    background-color: var(--darkest);
    border-radius: 50px;
    h2 {
      color: aliceblue;
    }
  }

  .secLog {
    animation: leftN 0.2s ease-in-out forwards;

    @keyframes leftN {
      0% {
        transform: translateX(60%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .secSign {
    animation: appear 0.2s ease-in-out forwards;
    @keyframes appear {
      0% {
        transform: translateX(-60%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
`;

export const InputContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--darker);
  height: 8vh;
  width: 50vh;
  margin-top: 0;
  opacity: 1;
  border-radius: 50px;
  color: white;

  input {
    height: 5vh;
    width: 40vh;
    background-color: transparent;
    border: none;
    color: white;
  }
  select {
    border: none;
    background-color: transparent;
    height: 5vh;
    width: 40vh;
    color: white;
    option {
      background-color: var(--darker);
    }
  }
  img {
    height: 3vh;
    width: 3vh;
    border-radius: 100%;
    margin-left: 5px;
  }
`;

// export const Image=styled.img`

//     height: 500px;
//     width: 700px;

//     margin-right: 50px;
//     margin-left: 10px;
//     animation: appear 1s ease-in;

//     @keyframes appear {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 0.95;
//     }
//   }
// `;
