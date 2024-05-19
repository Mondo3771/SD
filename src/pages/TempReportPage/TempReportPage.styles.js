import styled from "styled-components";

export const Body = styled.body`
  display: flex;
  margin : 1rem;
  // border : 2px solid black;
  height : 70vh;
  // width: 80vw;
  margin : 1rem auto;
  padding : 1rem;
  justify-content : space-between;
  `;

  export const UserReport=styled.section`
    display: flex;
    flex-direction: column;
    .close{
      padding: 5px;
    width: 5vw;
    height: 4vh;
    background-color: var(--white);
    color: var(--darkest);
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    }

  
  
  `
