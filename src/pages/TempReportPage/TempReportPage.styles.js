import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";
export const Body = styled.body`
  display: flex;
  //margin: 1rem;
  // border : 2px solid black;
  height: 70vh;
  // width: 80vw;
  //margin: 1rem auto;
  //padding: 1rem;
  justify-content: space-between;
  background-color: transparent;
`;

export const Wrapper = styled.section`
  background-image: url(${background});
  // background-color: blue;
  background: cover;
  //background-position: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100vw;
  height: fit-content;
  align-items: center;
`;
