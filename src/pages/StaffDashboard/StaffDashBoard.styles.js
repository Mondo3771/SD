import styled from "styled-components";
import background from "../../Images/Bckgrd.svg";
//react
import React, { useEffect, useState } from "react";

//icons
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/24/outline";
import { formatDate, formatTime } from "../../helper";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  min-height: 100vh;
  height: auto;
  width: 100vw;
  background-image: url(${background});
  background-size: cover;
  background-position: left;

  gap: 2rem;

  h1 {
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .titlepage {
    display: flex;
    flex-direction: start;
    text-align: left;
    padding-left: 10vw;
    padding-top: 0;
    width: 80vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: var(--white);
    font-size: 1.5rem;
  }

  .title {
    display: flex;
    flex-direction: start;
    text-align: left;
    padding-left: 0;
    width: 80vw;
    color: var(--white);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .sheet:hover,
  .sheet:hover ~ .deleteButtonFin,
  .sheet:hover ~ .stopButton,
  .sheet:hover ~ .playButton,
  .sheet:hover ~ .pauseButton,
  .deleteButtonFin + .sheet {
    background-color: white;
    cursor: pointer;
  }
  .sheet:hover ~ .deleteButtonFin {
    background-color: white;
    border: 2px solid white;
  }

  @media (max-width: 760px) {
    .sheet p {
      font-size: 0.5rem;
      margin: 0;
      /* outline: 1px saddlebrown solid; */
    }
    .sheet {
      margin: 0;
      height: 50px;
    }
    .removeButton,
    .pauseButton,
    .playButton,
    .stopButton {
      width: 25px;
    }

    h2 {
      font-size: 1rem;
     
    }
  }
`;

export const Header = styled.div`
  //position: sticky;
  position: fixed;
  z-index: 9999;
  width: 100%;
  //background-color: var(--darkest);
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

//whole card section
export const Card = styled.article`
  scroll-behavior: smooth;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  box-shadow: 10px;
  width: 80vw;
  min-height: 80vh;
  height: auto;
  color: var(--white);
  flex: 1;
  padding: 40px;
  margin: 0 auto 7vh auto;
  display: flex;
  /* overflow-y: auto; */
  flex-direction: column;

  //background: linear-gradient(65deg, var(--darkest), #3f2182);
  //background: linear-gradient(120deg, #16154e, var(--dark));
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  //background-color: var(--whiter);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .title {
    display: flex;
    gap: 1.5rem;
    transition: all 500ms ease-in-out;
    color: var(--darkest);
    align-items: center;
  }

  .createTaskButton {
    display: flex;
    border: none;
    background: var(--white);
    border-radius: 10px;
    width: 500px;
    padding: 5px 10px;
    justify-content: flex-start;
    color: white;
    cursor: pointer;
    height: 100%;
    transition: all 100ms ease-in-out;
  }

  .createTaskButton:hover {
    background: white;
  }
  .createTaskButton:hover ~ .clock {
    color: white;
  }

  .createTaskButton h2 {
    font-family: inherit;
    font-weight: 400;
    font-size: 1.2rem;
    color: var(--darkest);
  }
  h3 {
    font-family: inherit;
    font-weight: 400;
    font-size: 1.5rem;
    color: var(--white);
  }
  .clock {
    color: var(--white);
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

@media (max-width:760px){


    .createTaskButton {
    }

    .createTaskButton h2 {
      font-size: 0.8rem;
    }

    .title {
      font-size: 0.5rem;
    }
  
  .clock {
    height: 40px;
  }
}

`;

export const CreateTaskContainer = styled.section`
  display: flex;
  flex-direction: row;
  font-family: inherit;
  padding: 5px;
  gap: 1.5rem;
  transition: all 500ms ease-in-out;
  background: transparent;
  align-items: center;

  button {
    height: 6vh;
    width: fit-content;
    font-family: inherit;
    border-radius: 100%;
    background-color: var(--white);
    color: var(--darkest);
    font-size: 1.1rem;
  }

  input {
    height: 8vh;
    font-size: 1.1rem;
    width: 15vw;
    border-radius: 20px;
    font-family: inherit;
    background-color: var(--white);
    color: var(--darkest);
  }
  ::placeholder {
    font-family: inherit;
    color: rgba(0, 0, 0, 0.2);

    font-size: 1rem;
    text-align: left;
    align-items: center;
  }

  label {
    font-family: inherit;
    color: var(--white);
    font-size: 1rem;
    text-align: center;
    align-items: center;
  }

  @media (max-width: 760px){
    gap: 0.5rem;

    button {
      height: 40px;
    }
    input{
      height: 40px;
      font-size: 0.6rem;
      border: none;
    }
    ::placeholder {
      font-size: 0.6rem;
    }
  }
`;

export const LabelHolder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 0.5rem;
`;

export const Sheet = styled.div`
  background-color: var(--white);
  border-radius: 10px 0px 0px 10px;
  margin: 10px 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  height: 60px;
  align-items: center;

  p {
    color: var(--darkest);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: inherit;
  }
  .stopButton,
  .playButton,
  .pauseButton {
    background-color: inherit;
    color: white;
    cursor: pointer;
    border: none;
    transition: all 200ms ease-in-out;
  }

  .removeButton {
    background: var(--darker);
    color: white;
    width: 50px;
    border-radius: 50%;
    border: none;
  }

  @media screen and (max-width: 480px) {
    margin: 10px 0;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    width: 78vw;
    height: auto;
    align-items: center;

    p {
      font-size: 0.8rem;
    }
    .stopButton,
    .playButton,
    .pauseButton {
      background-color: var(--white);
      color: white;
      cursor: pointer;
      border: none;
      width: 1rem;
      height: 1rem;
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const ProjectHolder = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

  .SheetHolderFin {
    display: flex;
    align-items: center;
  }

  .deleteButtonFin {
    flex: 1;
    width: 50px;
    height: 60px;
    background-color: var(--white);
    color: var(--darker);
    border-radius: 0px 10px 10px 0;
    margin: 10px 0;
    border: 2px solid var(--white);
    padding: 5px 2px;
  }

  .deleteButtonFin:hover {
    cursor: pointer;
  }
  .deleteButtonFin:hover + .sheet {
    background-color: var(--white);
    /* border: 2px solid var(--white); */
  }

  .TrashIcon {
    margin: 0 0 0 6rem;
    transition: 200ms ease-in-out;
    /* width: inherit; */
  }

  .TrashIcon:hover {
    width: 30px;
    color: red;
  }
  @media (max-width: 760px) {
    .SheetHolderFin {
      padding: 0;
      margin: 0;
    }
    .TrashIcon {
      width: 15px;
      margin: 0;
    }
    .deleteButtonFin {
      height: 50px;
    }
  }
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
  .pauseIcon,
  .playIcon,
  .stopIcon {
    width: 25px;
  }

  @media (max-width: 760px) {
    padding: 0;
    margin: 0;
    min-width: 10px;

    .pauseIcon,
    .playIcon,
    .stopIcon {
      width: 15px;
    }
  }
`;

export const SheetContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const TaskDescription = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60vw;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const TaskContainer = ({ task, onPause, onStop, allProjects }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [stop, setStop] = useState(task.Active);
  const [time, setTime] = useState(task.Time);
  // const [initial,setInitial] = useState(false)

  const handleButtonClick = (prev) => !prev;

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevCounter) => prevCounter + 1);
      }, 1000);

      task.Time = time;
    } else {
      clearInterval(interval); // Stop the timer
      task.Time = time;
      setTime(task.Time);
    }

    return () => clearInterval(interval); // Cleanup function to clear the interval when component unmounts or when clicked changes
  }, [timerRunning, stop]);

  return (
    <Sheet
      className="sheet"
      id={task.Task_ID.toString()}
      key={task.Task_ID}
      onClick={() => {
        console.log(allProjects.length);
      }}
    >
      <TaskDescription>
        <p>{task.Description}</p>
        <p>{formatDate(task.Date)}</p>
        <p>{time !== task.Time ? formatTime(time) : formatTime(task.Time)}</p>
      </TaskDescription>

      <StopStartContainer>
        <button
          type="button"
          className="playButton"
          style={{
            color: !timerRunning ? "var(--whiter)" : "gray",
          }}
          onClick={() => setTimerRunning(handleButtonClick(timerRunning))}
          disabled={timerRunning}
          hidden={task.Active || stop}
        >
          <PlayIcon width="inherit" className="playIcon" />
        </button>
        <button
          type="button"
          className="pauseButton"
          style={{
            color: timerRunning ? "var(--whiter)" : "gray",
          }}
          onClick={() => {
            onPause(task, time);
            setTimerRunning(handleButtonClick(timerRunning));
          }}
          disabled={!timerRunning}
          hidden={task.Active || stop}
        >
          <PauseIcon width="inherit" className="pauseIcon" />
        </button>
        <button
          type="button"
          className="stopButton"
          style={{
            color: !timerRunning || stop ? "var(--whiter)" : "gray",
          }}
          onClick={() => {
            onStop(task, time);
            setStop(handleButtonClick(stop));
          }}
          disabled={timerRunning}
          hidden={task.Active || stop}
        >
          <StopIcon width="inherit" className="stopIcon" />
        </button>
      </StopStartContainer>
    </Sheet>
  );
};

export const allProjects = [
  {
    Task_ID: 0,
    Emp_ID: 0,
    Project: "Project",
    Description: "SD",
    Acitve: true,
    Time: 0,
    Date: "2015-09-09",
  },
  {
    Task_ID: 1,
    Emp_ID: 0,
    Project: "Project",
    Description: "SDW",
    Acitve: true,
    Time: 0,
    Date: "2015-09-09",
  },
];
