import styled from "styled-components";
import newback from "../HRHome/Images/Bckgrd.svg";

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
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  //box-sizing: border-box;
  background-image: url(${newback});
  //background: var(--darkest);
  background-size: cover;
  background-position: top;

  gap: 2rem;

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
`;
