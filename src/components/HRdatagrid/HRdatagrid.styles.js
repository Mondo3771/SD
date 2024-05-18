import styled from "styled-components";

export const Card = styled.article`
  //scroll-behavior: smooth;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  box-shadow: 10px;
  width: 80vw;
  max-height: 80vh;
  color: var(--white);
  flex: 1;
  padding: 40px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  //background: linear-gradient(65deg, var(--darkest), #3f2182);
  //background: linear-gradient(120deg, #16154e, var(--dark));
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  //background-color: var(--whiter);
  //background: linear-gradient(135deg, #16154e, var(--dark));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .title {
    display: flex;
    gap: 1.5rem;
    transition: all 500ms ease-in-out;
    color: var(--darkest);
  }

  .css-yrdy0g-MuiDataGrid-columnHeaderRow, .MuiDataGrid-topContainer {
    background: var(--darkest);
    border-radius: 20px 20px 0 0; 
  }

  .MuiDataGrid-row:hover {
    cursor: pointer;
    background: white;
    color: white;
    font-size: 1.2rem;
  }
`;

export const Title=styled.h2`
  display: flex;
  flex-direction: start;
  text-align: left;
  padding-left: 10vw;
  width: 80vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--white);
  font-size: 1.5rem;
`