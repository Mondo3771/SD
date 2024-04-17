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
const Emp_ID = 14;
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

  const [task, setTask] = useState("");
  const [name, setName] = useState("");

  const [createTask, setCreate] = useState(false);

  const handleClick = (prev) => !prev;

  const handleAdd = (taskToAdd) => {
    taskToAdd["Emp_ID"] = Emp_ID;
    const add = () => {
      fetch("/api/Tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToAdd),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    add();
    setAllProjects((prevTasks) => [...prevTasks, taskToAdd]);
  };

  const projectNameChange = (event) => {
    setName(event.target.value);
  };

  const taskChange = (event) => {
    setTask(event.target.value);
  };
  const handlePause = (tastToPause) => {
    // takes time from the task and task id
    const pause = () => {
      fetch(`/api/Tasks/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: taskToPause.time,
          taskID: taskToPause.taskID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    pause();
  };
  const handleStop = (taskToStop) => {
    // in here we pass a task_id and
    //cahnge true to false ,,,, ACtive
    fetch(`/api/Tasks/${taskToStop.taskID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDelete = (taskToDelete) => {
    // pass task id to delete
    const deleteTask = () => {
      fetch(`/api/Tasks/${taskToDelete.taskID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    setAllProjects((prevTasks) =>
      prevTasks.filter((task) => task !== taskToDelete)
    );
  };

  //gets the unique project names
  console.log("====================================");
  console.log(AllProjects);
  console.log("====================================");
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
        {!createTask ? (
          <section className="title">
            <button
              className="createTaskButton"
              onClick={() => setCreate(handleClick)}
            >
              <h2>Create a task</h2>
            </button>
            <ClockIcon className="clock" width={50} />
          </section>
        ) : (
          <CreateTaskContainer>
            <LabelHolder>
              <label>Project Name</label>
              <input
                type="text"
                placeholder="project name"
                value={name}
                onChange={projectNameChange}
              ></input>
            </LabelHolder>
            <LabelHolder>
              <label>Task Name</label>
              <input
                type="text"
                placeholder="task name"
                value={task}
                onChange={taskChange}
              ></input>
            </LabelHolder>
            <button
              type="button"
              onClick={() => {
                const newTask = {
                  Emp_ID: name, // Assuming 'name' holds the employee ID
                  Project: task, // Assuming 'task' holds the project name
                  Date: "2018-09-08",
                  Description: task, // Assuming 'task' holds the task description
                  Time: 0,
                  Active: false, // Assuming 'done' corresponds to 'Active'
                };
                return handleAdd(newTask);
              }}
            >
              Add task{" "}
            </button>
          </CreateTaskContainer>
        )}

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
  // get all task by ID
  const Projects = fetch(`/api/Tasks/${Emp_ID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return { Projects };
};
