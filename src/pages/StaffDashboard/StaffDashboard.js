//react
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//icons
import { ClockIcon, ArrowRightIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

import logo from "./Images/logo3.svg";
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
// import sheet from "styled-components/dist/sheet";

// Function to filter unique Project values and return an array of unique projects
function filterUniqueProjects(projects) {
  const uniqueProjects = {};
  const result = [];

  projects.forEach((project) => {
    if (!uniqueProjects[project.Project]) {
      uniqueProjects[project.Project] = true;
      result.push(project.Project); // Pushing the project name only
    }
  });

  return result;
}

function filterTasksByProject(Sheets, projectName) {
  const tasks = [];

  for (let i = 0; i < Sheets.length; i++) {
    if (projectName === Sheets[i].Project) {
      // Add tasks of the matching project to the tasks array
      tasks.push(Sheets[i]);
    }
  }

  return tasks;
}

const StaffDashboard = () => {
  const location = useLocation();
  //  const data = location.state.params; // Remove this line

  // const Emp_ID = data.Emp_ID;
  const Emp_ID = 1;
  const [Loaded, setLoaded] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  const [uniqueProjectNames, setUniqueProjectNames] = useState([]);


  useEffect(() => {
//replace allprojects with data from fetch

const Projects = () => {
  fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      const uniques = filterUniqueProjects(data.data);
      setUniqueProjectNames(uniques);
      setAllProjects(data.data);
      setLoaded(true);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
// Projects();
setLoaded(true)
   
  }, []);

  const [task, setTask] = useState("");
  const [name, setName] = useState("");

  const [createTask, setCreate] = useState(false);

  const handleClick = (prev) => !prev;

  const handleAdd = (taskToAdd) => {
    taskToAdd["Emp_ID"] = Emp_ID;
    taskToAdd["Task_ID"] = Math.random() * 100;

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
          console.log("Success:", data.data);
          taskToAdd["Task_ID"] = data.data.Task_ID;
          setAllProjects((prev) => {
            setUniqueProjectNames(filterUniqueProjects([taskToAdd, ...prev]));
            return [taskToAdd, ...prev];
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    // add(); 
    setAllProjects((prev) => {
      setUniqueProjectNames(filterUniqueProjects([taskToAdd, ...prev]));
      return [taskToAdd, ...prev];
    });

  };

  const projectNameChange = (event) => {
    setName(event.target.value);
  };

  const taskChange = (event) => {
    setTask(event.target.value);
  };
  const handlePause = (taskToPause, time) => {
    console.log("pause ", taskToPause);
    // takes time from the task and task id
    const pause = () => {
      fetch(`/api/Tasks/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Time: time,
          Task_ID: taskToPause.Task_ID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    pause();

  };
  const handleStop = (taskToStop) => {
    // console.log(taskToStop);
    // in here we pass a task_id and
    //cahnge true to false ,,,, ACtive
    fetch(`/api/Tasks/?Task_ID=${taskToStop.Task_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDelete = (taskToDelete) => {
    // pass task id to delete
    const deleteTask = () => {
      fetch(`/api/Tasks/?Task_ID=${taskToDelete.Task_ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    deleteTask()
    setAllProjects((a) => a.filter((p) => p.Task_ID !== taskToDelete.Task_ID));

    // setSheets(updatedSheets);
    setUniqueProjectNames(
      filterUniqueProjects(
        AllProjects.filter((p) => p.Task_ID !== taskToDelete.Task_ID)
      )
    );

  };

  return (
    <Wrapper>
      {/* <StaffHeader employee={data}></StaffHeader> */}
      <Header>
        <section className="logo">
          <img src={logo} width="55vw" height="55vh"></img>
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
              <a onClick={Lunch}>Lunch</a>
            </li>
          </ul>
        </nav>
        <ArrowRightIcon width={24} />
      </Header>
      <section className="titlepage">
        <h2>Task Tracker</h2>
      </section>

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
              {/* <label>Project Name</label> */}
              <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={projectNameChange}
              ></input>
            </LabelHolder>
            <LabelHolder>
              {/* <label>Task Name</label> */}
              <input
                type="text"
                placeholder="Task Name"
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
              {/* Add Task{" "} */}
              <PlusIcon width={30}></PlusIcon>
            </button>
          </CreateTaskContainer>
        )}
        {Loaded &&
          uniqueProjectNames.map((name, index) => {
            return (
              <ProjectHolder key={index}>
                <h2>{name}</h2>

                {/* {filterTasksByProject(AllProjects, name).map((s) => s.Component)} */}
                {filterTasksByProject(AllProjects, name).map((s) => (
                  <article className="SheetHolderFin">
                    <TaskContainer
                      task={s}
                      key={s.Task_ID}
                      onPause={handlePause}
                      onStop={handleStop}
                      allProjects={AllProjects}
                    ></TaskContainer>
                    <button className="deleteButtonFin">
                      <TrashIcon className="TrashIcon" width={25} onClick={() => handleDelete(s)}/> </button>
                  </article>
                ))}
              </ProjectHolder>
            );
          })}
      </Card>
    </Wrapper>
  );
};

export default StaffDashboard;

export { Projects, add, pause, deleteTask };
