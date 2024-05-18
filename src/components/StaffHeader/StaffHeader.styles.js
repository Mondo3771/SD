import styled from "styled-components";

export const Header = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: transparent;
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  .logo {
    display: flex;
    transition: all 100ms ease-in-out;
  }
  .logo:hover {
    width:"57vw";
    height:"57vh";
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
  li:hover{
    color: var(--white);
    cursor: pointer;
    transition: all 250ms ease-in-out;
  }

  li a:hover {
    color: var(--white);
    cursor: pointer;
    transition: all 250ms ease-in-out;
  }

  

  /* Media query for screens smaller than 768px */
  @media screen and (max-width: 768px) {
    padding: 0.5rem 1rem;

    .logo img {
      width: 40px;
      height: 40px;
    }

    a {
      font-size: 1rem;
    }

    ul {
      gap: 2rem;
    }
  }

  /* Media query for screens smaller than 480px */
  @media screen and (max-width: 480px) {
    padding: 0.5rem 0.5rem;

    .logo img {
      width: 30px;
      height: 30px;
    }

    a {
      font-size: 0.8rem;
    }

    ul {
      gap: 1rem;
    }
  }
`;
