import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background: var(--dark);
  min-height: 100vh;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  min-height: 14vh;
  align-items: center;
  // border: 1px solid black;

  .logo {
    display: flex;
  }

  a {
    font-size: 1.35rem;
    text-decoration: none;
    transition: all 200 ease-in-out;
  }

  ul {
    display: flex;
    padding: 0;
    list-style: none;
    gap: 5rem;
  }

  a:visited {
    color: black;
  }

  li a:hover {
    color: var(--darker);
  }
`;

export const Card = styled.article`
  scroll-behavior: smooth;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  box-shadow: 10px;
  background: var(--whiter);
  width: 1300px;
  min-height: 500px;
  color: var(--darkest);
  flex: 1;
  padding: 40px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    gap: 1.5rem;
  }

  .createTaskButton {
    display: flex;
    border: none;
    background: var(--darker);
    border-radius: 10px;
    width: 500px;
    padding: 5px 10px;
    justify-content: flex-start;
    color: white;
  }
  .createTaskButton h2 {
    font-family: inherit;
    font-weight: 400;
    font-size: 1.1rem;
  }
  .clock {
    // background: var(--darker);
    color: var(--darker);
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export const Sheet = styled.div`
  background-color: var(--darker);
  border: 2px solid var(--darker);
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  p {
    color: white;
    font-size: 1.1rem;
  }
  .stopButton,
  .playButton,
  .pauseButton {
    background-color: var(--darker);
    color: white;
    cursor: pointer;
    border: none;
  }

  .removeButton {
    background: var(--darker);
    color: white;
    width: 50px;
    border-radius: 50%;
    border: none;
  }
`;

export const ProjectHolder = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
`;

export const StopStartContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 200px;
  justify-content: flex-end;

  button {
    width: 50px;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
  }
`;
