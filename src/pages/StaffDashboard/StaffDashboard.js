//react
import React, { useState } from "react";

//icons
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// StaffDashboard styles
import {
  Card,
  CreateTaskContainer,
  Header,
  LabelHolder,
  ProjectHolder,
  TaskContainer,
  Wrapper,
} from "./StaffDashBoard.styles";

import { fetchData, setData } from "../../helpers/helpers";
import { useLoaderData } from "react-router";

// const p = [
//   {
//     name: "Login",
//     task: "Button",
//     date: "2015-03-02",
//     time: "00:06:00",
//     done: true,
//     taskID: 0
//   },
//   {
//     name: "Login",
//     task: "Butto2",
//     date: "2015-03-02",
//     time: "00:06:00",
//     done: true,
//     taskID: 1
//   },
//   {
//     name: "SignUp",
//     task: "Butto3",
//     date: "2015-03-02",
//     time: "00:06:00",
//     done: false,
//     taskID: 2,
//   },
//   {
//     name: "SignUp",
//     task: "Butto4",
//     date: "2015-03-02",
//     time: "00:06:00",
//     done: false,
//     taskID: 3,
//   },
//   {
//     name: "Login",
//     task: "ButtonD",
//     date: "2015-03-02",
//     time: "00:06:00",
//     done: true,
//     taskID: 4,
//   },
// ];

export const StaffDashboard = () => {
  const { Projects } = useLoaderData();

  const [AllProjects, setAllProjects] = useState(Projects);
  
  const [task,setTask] = useState("")
  const [name,setName] = useState("")

const [createTask, setCreate] = useState(false)


  const handleClick = (prev) => !prev;

  const hnadleAdd = (taskToAdd) => {
    setAllProjects(prevTasks => [...prevTasks,taskToAdd]);
  }

  const projectNameChange = (event) => {
    setName(event.target.value);
  }

  const taskChange = (event) => {
    setTask(event.target.value);
  }
   
  const handleDelete = (taskToDelete) => {
    setAllProjects((prevTasks) =>
      prevTasks.filter((task) => task !== taskToDelete)
    );
  };

  //gets the unique project names
  console.log('====================================');
  console.log(AllProjects);
  console.log('====================================');
  const uniqueProjects = AllProjects.reduce((partialSum, project) => {
    if (!partialSum.includes(project.name)) {
      return [...partialSum, project.name];
    }
    return partialSum;
  }, []);

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
        {!createTask ?
        <section className="title">
          <button className="createTaskButton" onClick={() => setCreate(handleClick)}>
            <h2>Create a task</h2>
          </button>
          <ClockIcon className="clock" width={50} />
        </section> :
        <CreateTaskContainer>
          <LabelHolder>
            <label>Project Name</label>
            <input type="text" placeholder="project name"value={name} onChange={projectNameChange}></input>
          </LabelHolder>
          <LabelHolder>
            <label>Task Name</label>
            <input type="text" placeholder="task name" value={task} onChange={taskChange}></input>
          </LabelHolder>
          <button type="button" onClick={() => {
            const newTask = {name: name, task: task,done: false, date: "2018-09-08",taskID:10};
            return hnadleAdd(newTask)}} >Add task </button>
        </CreateTaskContainer>
        }

        {uniqueProjects.map((name, index) => {
          return (
            <ProjectHolder key={index}>
              <h2>{name}</h2>
              {AllProjects.filter((project) => project.name === name).map(
                (item, i) => {
                  return (
                    <TaskContainer
                      key={i}
                      task={item}
                      onDelete={handleDelete}
                    ></TaskContainer>
                  );
                }
              )}
            </ProjectHolder>
          );
        })}
      </Card>
    </Wrapper>
  );
};

export const StaffDashBoardLoader = () => {
  const Projects = fetchData("Projects") ?? [];
  return { Projects };
};
