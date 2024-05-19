import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";
export const Feedback = styled.article`
  background-color: var(--dark);
  height: 60vh;
  width: fit-content;
  color: red;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 3vw;
  border-radius: 4%;
  margin-bottom: 40px;
  padding: 2vw;
  .text {
    display: flex;
    border: 10px black;
    justify-content: center;
    flex-direction: column;
    background-color: transparent;
    border-radius: 8%;
    padding: 0%.8;
  }
`;
export const Heading = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 3vh;

  h2 {
    width: 50vw;
    height: 4vw;
    color: var(--white);
    padding-left: 4vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  button {
    color: var(--dark);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: var(--white);
  }
`;
export const Main = styled.section`
  //background-color: var(--white);
  background-color: rgba(19, 7, 46, 0.4);
  padding-top: 0;
  border: 2px solid white;
  border-radius: 5%;
  //change back to trasparent
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  width: 97vw;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  gap: 0;
`;
export const Summary = styled.article`
  display: flex;

  //background-color: var(--white);
  width: fit-content;
  justify-content: center;
  //margin-top: 20px;
  height: 60vh;
  background-color: transparent;

  margin: 0;
`;

export const Block = styled.section`
  height: 600px;
  background-color: yellow;
`;
export const Progress = styled.article`
  height: 40vh;
  width: fit-content;
  //margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //border: 2px solid black;
  //border-radius: 10%;
  padding: 2vh;
  align-items: center;
  color: var(--white);
  //background-color: var(--white);
  background-color: transparent;
  //backdrop-filter: blur(10px);
  // -webkit-backdrop-filter: blur(10px);

  margin: 0;
  p {
    color: var(--darkpurple);
  }
`;

export const Bottom = styled.article`
  display: flex;
  flex-direction: row;
  //background-color: transparent;
  //background-color: var(--white);
  justify-content: space-evenly;
  align-items: center;
  background-color: transparent;
  //backdrop-filter: blur(10px);
  // -webkit-backdrop-filter: blur(10px);
  margin: 0;
  gap: 4vh;
  justify-content: center;
  align-items: center;
`;

export const Dater = styled.form`
  display: flex;
  flex-direction: row;
  color: var(--dark);
  padding-left: 4vh;
  gap: 3vh;
  padding-bottom: 2vh;
  input {
    width: 7vw;
    height: 3vh;
    font-size: 1rem;
    border-radius: 10px;
  }
  label {
    font-family: Verdana, Geneva, Tahoyma, sans-serif;
    font-size: 1.2rem;
    color: var(--white);
  }
  ::placeholder {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1rem;
    color: var(--darkpurple);
    text-align: center;
  }
`;

export const ChartSection = styled.section`
  display: flex;
  flex-direction: row;
`;
