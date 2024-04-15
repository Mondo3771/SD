//react
import React, { useEffect, useState } from "react";

//icons
import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  StopIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// StaffDashboard styles
import {
  Card,
  Header,
  ProjectHolder,
  Sheet,
  StopStartContainer,
  Wrapper,
} from "./StaffDashBoard.styles";

import { fetchData } from "../../helpers/helpers";

const projects = [
  {
    name: "Login",
    task: "Button",
    date: "2015-03-02",
    time: "00:06:00",
    done: true,
  },
  {
    name: "Login",
    task: "Butto2",
    date: "2015-03-02",
    time: "00:06:00",
    done: true,
  },
  {
    name: "SignUp",
    task: "Butto3",
    date: "2015-03-02",
    time: "00:06:00",
    done: false,
  },
  {
    name: "SignUp",
    task: "Butto4",
    date: "2015-03-02",
    time: "00:06:00",
    done: false,
  },
  {
    name: "Login",
    task: "ButtonD",
    date: "2015-03-02",
    time: "00:06:00",
    done: true,
  },
];

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const renderSheets = (projects,f) => {
  const remove = (index)=>{
    const newArray = [...projects];
    newArray.splice(index, 1);
    console.log(newArray);

    f( () => newArray)
    projects = newArray;
    console.log(projects);
  };


  //to give a list of unique project names
  // console.log(f);
  const uniqueProjects = projects.reduce((partialSum, project) => {
    if (!partialSum.includes(project.name)) {
      return [...partialSum, project.name];
    }
    return partialSum;
  }, []);

  // uses this to sort timesheet and put items on display
  return uniqueProjects.map((name, index) => {
    return (
      <ProjectHolder key={index}>
        <h2>{name}</h2>
        {projects
          .filter((project) => project.name === name)
          .map((item, i) => {
            const [timerRunning, setTimerRunning] = useState(false);
            const [stop, setStop] = useState(false);
            const [time, setTime] = useState(0);
            const [AllProjects, setAllProjects] = useState(projects);

            const handleButtonClick = (prev) => !prev  

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
              <Sheet key={i}>
                <p>{item.task}</p>
                <p>{item.date}</p>
                <p>{!item.done ? formatTime(time) : item.time}</p>
                <StopStartContainer>
                  <button
                    className="playButton"
                    style={{
                      color: !timerRunning ? "var(--whiter)" : "gray",
                    }}
                    onClick={() =>
                      setTimerRunning(handleButtonClick(timerRunning))
                    }
                    disabled={timerRunning}
                    hidden={item.done || stop}
                  >
                    <PlayIcon width={25} />
                  </button>
                  <button
                    className="pauseButton"
                    style={{
                      color: timerRunning ? "var(--whiter)" : "gray",
                    }}
                    onClick={() =>
                      setTimerRunning(handleButtonClick(timerRunning))
                    }
                    disabled={!timerRunning}
                    hidden={item.done || stop}
                  >
                    <PauseIcon width={25} />
                  </button>
                  <button
                    className="stopButton"
                    style={{
                      color: !timerRunning || stop ? "var(--whiter)" : "gray",
                    }}
                    onClick={() => setStop(handleButtonClick(stop))}
                    disabled={item.done || stop || timerRunning}
                  >
                    <StopIcon width={25} />
                  </button>
                </StopStartContainer>
                <button className="removeButton"
                 onClick={() => { 
                  console.log(i)
                  console.log(AllProjects)
                  remove(i)
                  console.log(i)
                  console.log(AllProjects)
                }}
                 >
                  <TrashIcon width={25} />
                </button>
              </Sheet>
            );
          })}
      </ProjectHolder>
    );
  });
};

export const StaffDashboard = () => {
  const [AllProjects,setAllProjects] = useState(projects);

  // const Projects = fetchData("Projects") ?? []
  // console.log(Projects);

  return (
    <Wrapper>
      <Header>
        <section className="logo">
          <img className="logoPic"></img>
          <h1>
            <a href="/">SYNERGY</a>
          </h1>
        </section>
        <nav className="links">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Reports</a>
            </li>
            <li>
              <a href="#">Lunch</a>
            </li>
          </ul>
        </nav>
        <ArrowRightIcon width={24} />
      </Header>

      <Card>
        <section className="title">
          <button className="createTaskButton">
            <h2>Create a task</h2>
          </button>
          <ClockIcon className="clock" width={50} />
        </section>
        {renderSheets(AllProjects,setAllProjects)}
      </Card>
    </Wrapper>
  );
};
