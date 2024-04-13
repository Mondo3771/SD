import React, { useEffect, useState } from "react";
import {
    Card,
  Header,
  ProjectHolder,
  Sheet,
  StopStartContainer,
  Wrapper,
} from "./StaffDashBoard.styles";

const projects = [
  { name: "Login", task: "Button", date: "2015-03-02", time: "00:06:00", done: true },
  { name: "Login", task: "Butto2", date: "2015-03-02", time: "00:06:00", done: true  },
  { name: "SignUp", task: "Butto3", date: "2015-03-02", time: "00:06:00", done: false  },
];

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


const renderSheets = (projects) => {
  //to give a list of unique project names
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
            }, [timerRunning,stop]);

            return (
              <Sheet key={i}>
                <p>{item.task}</p>
                <p>{item.date}</p>
                <p>{!item.done ? formatTime(time) : item.time}</p>
                <StopStartContainer>
                  <button
                    onClick={() =>
                      setTimerRunning(handleButtonClick(timerRunning))
                    }
                    disabled={timerRunning}
                    hidden={item.done || stop}
                  >
                    Play
                  </button>
                  <button
                    onClick={() =>
                      setTimerRunning(handleButtonClick(timerRunning))
                    }
                    disabled={!timerRunning}
                    hidden={item.done || stop}
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => setStop(handleButtonClick(stop))}
                    disabled={item.done || stop || timerRunning}
                  >
                    Stop
                  </button>
                </StopStartContainer>
                <button>X</button>
              </Sheet>
            );
          })}
      </ProjectHolder>
    );
  });
};

export const StaffDashboard = () => {
  const [AllProjects, setAllProjects] = useState(projects);

  return <Wrapper>
        <Header>
            <section className="logo">
                <img className="logoPic"></img>
            <h1><a href="/">Synergy</a></h1>
            </section>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href='#'>Reports</a></li>
                    <li><a href='#'>Lunch</a></li>
                    
                </ul>
            </nav>
        </Header>
    
    <Card>{renderSheets(AllProjects)}</Card></Wrapper>
};
