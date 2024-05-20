import styled from "styled-components";
import newback from "../../Images/Bckgrd.svg";

export const Header = styled.header`
  position: sticky;
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  // border: 1px solid black;

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
    cursor: pointer;
    transition: all 200 ease-in-out;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  background-image: url(${newback});
  background-size: cover;
  background-position: top;
  height: 100vh;
  gap: 1rem;
  overflow-x: hidden;

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
  .css-yrdy0g-MuiDataGrid-columnHeaderRow,
  .MuiDataGrid-topContainer {
    background: var(--darkest);
    border-radius: 20px 20px 0 0;
  }
  .MuiBox-root,
  .MuiDataGrid-main {
    border-radius: 20px 20px 0 0;
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
    transition: all 50ms ease-in-out;
  }
 
  .MuiDataGrid-row .icons:hover {
    color: red;
    width: 25px;
    height: 25px;
  }
`;
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
`;
