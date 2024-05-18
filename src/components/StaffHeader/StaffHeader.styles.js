import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";

export const Header = styled.div`
  position: sticky;
  z-index: 9999;
  width: 100%;

  background-image: url(${background});
  background-position: top;
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

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
  }

  a:visited {
    color: white;
  }

  li a:hover {
    color: var(--white);
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
  .profile{
    background-color: transparent;
    color: white;
    border: none;
    
  }
`;

export const Aside=styled.aside`

img{
  border-radius: 100%;

}
color: white;
ul{
  text-decoration: none;
    list-style-type: none;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

padding-top:14vh;
margin-top:0;
background-color: hsl(242deg 39.34% 20.67%);
display: flex;
justify-content: center;



`
