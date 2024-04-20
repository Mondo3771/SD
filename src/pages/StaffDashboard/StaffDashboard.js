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

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const StaffDashboard = () => {
  const location = useLocation();
  const data = location.state.params; // Remove this line
  const User = data;
  const Emp_ID = data.Emp_ID;
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const Projects = () => {
      fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setAllProjects(data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    Projects();
    console.log(AllProjects);
  }, []);

  const [AllProjects, setAllProjects] = useState(null);

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
          taskToAdd["Task_ID"] = data.Task_ID;
          setAllProjects((prevTasks) => [...prevTasks, taskToAdd]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    add();
  };

  const projectNameChange = (event) => {
    setName(event.target.value);
  };

  const taskChange = (event) => {
    setTask(event.target.value);
  };
  const handlePause = (taskToPause, time) => {
    console.log(taskToPause);
    // takes time from the task and task id
    const pause = () => {
      console.log(taskToPause);
      fetch(`/api/Tasks/`, {
        method: "PUT",
        headers: {
          "Content-Type": "applicati`on/json",
        },
        body: JSON.stringify({
          time: time,
          taskID: taskToPause.Task_ID,
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
    console.log(taskToStop);
    // in here we pass a task_id and
    //cahnge true to false ,,,, ACtive
    fetch(`/api/Tasks/?task_ID=${taskToStop.Task_ID}`, {
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
    console.log(taskToDelete);
    // pass task id to delete
    const deleteTask = () => {
      fetch(`/api/Tasks/?task_ID=${taskToDelete.Task_ID}`, {
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
    deleteTask();
    setAllProjects((prevTasks) =>
      prevTasks.filter((task) => task !== taskToDelete)
    );
  };
  let uniqueProjects = [];
  if (Loaded) {
    uniqueProjects = AllProjects.reduce((partialSum, project) => {
      if (!partialSum.includes(project.Project)) {
        return [...partialSum, project.Project];
      }
      return partialSum;
    }, []);
  }
  //gets the unique project names

  console.log(AllProjects);

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
                const today = new Date().toISOString().slice(0, 10);
                const newTask = {
                  Emp_ID: Emp_ID, // Assuming 'name' holds the employee ID
                  Project: name, // Assuming 'task' holds the project name
                  Date: today,
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

        {Loaded &&
          uniqueProjects.map((name, index) => {
            return (
              <ProjectHolder key={index}>
                <h2>{name}</h2>
                {AllProjects.filter((project) => project.Project === name).map(
                  (item, i) => {
                    return (
                      <TaskContainer
                        key={i}
                        task={item}
                        onDelete={handleDelete}
                        onPause={handlePause}
                        onStop={handleStop}
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

// export const StaffDashBoardLoader = () => {
//   // get all task by ID
//   const Projects = fetch(`/api/Tasks/${Emp_ID}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//       console.log(data);

//       return data;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   return { Projects };
// };
export default StaffDashboard;
