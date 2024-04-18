import styled from "styled-components";

//react
import React, { useEffect, useState } from "react";

//icons
import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

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
  height: 500px;
  color: var(--darkest);
  flex: 1;
  padding: 40px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    gap: 1.5rem;
    transition: all 500ms ease-in-out;
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
    cursor: pointer;
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

export const CreateTaskContainer = styled.section`
  display: flex;
  font-family: inherit;
  border: 1px solid black;
  padding: 5px;
  transition: all 500ms ease-in-out;

  button {
    3
  }
`;
export const LabelHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0.5rem;
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

export const SheetContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const TaskContainer = ({ task, onDelete, onPause, onStop }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);

  const handleButtonClick = (prev) => !prev;

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Stop the timer
      // setTime(0);
    }

    return () => clearInterval(interval); // Cleanup function to clear the interval when component unmounts or when clicked changes
  }, [timerRunning, stop]);

  return (
    <Sheet key={task.task_ID}>
      <p>{task.Description}</p>
      <p>{task.Date}</p>
      <p>{!task.Active ? formatTime(time) : task.Time}</p>
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
          <PlayIcon width={25} />
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
          <PauseIcon width={25} />
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
          disabled={task.Active || stop || timerRunning}
        >
          <StopIcon width={25} />
        </button>
      </StopStartContainer>
      <button
        type="button"
        className="removeButton"
        onClick={() => onDelete(task)}
      >
        <TrashIcon width={25} />
      </button>
      <input name="_action" type="hidden" value={"deleteTask"} />
      <input type="hidden" name="taskID" value={task.task_ID} />
    </Sheet>
  );
};
