import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";
export const Body = styled.section`
  display: flex;
  //margin: 1rem;
  border: 2px solid white;
  border-radius: 30px;
  height: 70vh;
  width: 90vw;
  margin-bottom: 5vh;
  //margin: 1rem auto;
  padding: 3rem;
  justify-content: space-between;
  gap: 8vh;


  background-color: rgba(19, 7, 46, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);  
  overflow-x: hidden;
`;
export const Wrapper = styled.section`
  background-image: url(${background});
  // background-color: blue;
  background: cover;
  background-position: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
  width: 100%;
  height: fit-content;
  align-items: center;
  overflow-x: hidden;

`;

export const FeedbackSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  background-color: blue;
`;
export const Heading = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  h2 {
    width: 100vw;
    height: fit-content;
    color: var(--white);
    padding-left: 10vh;
    font-size: 2.5rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;
