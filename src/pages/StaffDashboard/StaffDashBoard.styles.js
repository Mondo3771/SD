import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background: var(--dark);
  height: 100vh;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-around;
    height: 10vh;
    border : 1px solid black;
    align-items: center;

    a {
        text-decoration: none;
    }
    ul {
        list-style-type: none;
        list-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: ;
        // gap: 0.5rem;
        border : 1px solid black;
    }

    li {
        display: flex;
        list-decoration: none;
        justify-content: space-between;

    }

    a:visited , ul li a:visited {
        color: black;
    }

    li a {
        border : 1px solid black;
    }


`

export const Card = styled.article`
  border-radius: 50px;
  border: 1px solid black;
  // color: aliceblue;
  background: var(--whiter);
  width: 1300px;
  height: 90%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`;

export const Sheet = styled.div`
  background-color: black;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  p {
    color: red;
  }
`;

export const ProjectHolder = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

  padding: 5px;
`;

export const StopStartContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 200px;
  justify-content: flex-end;

  button {
    width: 60px;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
  }
`;
