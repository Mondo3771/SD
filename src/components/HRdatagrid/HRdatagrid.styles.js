import styled from "styled-components";

export const Card = styled.article`
  //scroll-behavior: smooth;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  /* border: 2px solid saddlebrown; */
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
  overflow-x: hidden;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .title {
    display: flex;
    gap: 1.5rem;
    transition: all 500ms ease-in-out;
    color: var(--darkest);
  }

  .css-yrdy0g-MuiDataGrid-columnHeaderRow,
  .MuiDataGrid-topContainer {
    background: var(--darkest);
    border-radius: 20px 20px 0 0;
  }
  .MuiBox-root,
  .MuiDataGrid-main {
    border-radius: 20px 20px 0 0;
    background: var(--darkest);
  }

  .MuiDataGrid-row {
    transition: all 50ms ease-in-out;
  }

  .MuiDataGrid-row:hover {
    cursor: pointer;
    background: white;
    color: white;
    font-size: 1.3rem;
  }
  .icons {
    transition: all 70ms ease-in-out;
  }
  .MuiDataGrid-row .icons:last-child:hover {
    color: red;
    width: 25px;
    height: 25px;
  }

`;

export const Title = styled.h2`
  display: flex;
  flex-direction: start;
  text-align: left;
  padding-left: 10vw;
  width: 80vw;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: var(--white);
  font-size: 1.5rem;
`;
