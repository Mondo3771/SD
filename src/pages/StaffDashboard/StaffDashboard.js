//react
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchStorageData, setLocalStorage } from "../../helper";
//icons
import {
  ClockIcon,
  ArrowRightIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  allProjects,
  Card,
  CreateTaskContainer,
  Header,
  LabelHolder,
  ProjectHolder,
  TaskContainer,
  Wrapper,
} from "./StaffDashBoard.styles";

import StaffHeader from "../../components/StaffHeader/StaffHeader";
import { useEffect } from "react";
import LoginButton from "../../components/Log/LoginButton";
import { toast } from "react-toastify";
import { MockUser } from "../../components/FeedBackComponent/FeedBack.styles";
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
  // const location = useLocation();
  const history = useHistory();
  const data = fetchStorageData({ key: "User" });
  const Emp_ID = data.Emp_ID;
  // const Emp_ID = 87;
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
          let projects = data.data.sort((a,b) => {
            return new Date(a.Date)- new Date(b.Date)
          })
          const uniques = filterUniqueProjects(projects);

          setUniqueProjectNames(uniques);
          setAllProjects(projects);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    Projects();

    // const uniques = filterUniqueProjects(allProjects);
    // setUniqueProjectNames(uniques);
    // setAllProjects(allProjects);
    // setLoaded(true);
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
          Autherization: "",
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
          toast.success(`${taskToAdd.Description} successfully created!`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    add();
    setCreate(handleClick);
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
  const deleteTask = (taskToDelete) => {
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
  const handleDelete = (taskToDelete) => {
    // pass task id to delete
    deleteTask(taskToDelete);
    setAllProjects((a) => a.filter((p) => p.Task_ID !== taskToDelete.Task_ID));
    // setSheets(updatedSheets);
    setUniqueProjectNames(
      filterUniqueProjects(
        AllProjects.filter((p) => p.Task_ID !== taskToDelete.Task_ID)
      )
    );
  };
  // const data = ""
  const Lunch = () => {
    history.push("/Lunch", { params: data });
  };
  return (
    <Wrapper>
      <StaffHeader employee={data}></StaffHeader>
      <section className="titlepage">
        <h2>Task Tracker</h2>
      </section>

      <Card>
        {!createTask ? (
          <section className="title">
            <button
              className="createTaskButton"
              onClick={() => {
                setCreate(handleClick);
              }}
              aria-label="Create Task Button"
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
                aria-label="Project Place Holder"
                value={name}
                onChange={projectNameChange}
              ></input>
            </LabelHolder>
            <LabelHolder>
              <input
                type="text"
                placeholder="Task Name"
                aria-label="Task Name Place Holder"
                value={task}
                onChange={taskChange}
              ></input>
            </LabelHolder>
            <button
              type="button"
              aria-label="Add Task"
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
              <PlusIcon alt="Plus Icon" width={30}></PlusIcon>
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
                      <TrashIcon
                        className="TrashIcon"
                        aria-label="Delete Button"
                        width={"25px"}
                        onClick={() => handleDelete(s)}
                        alt="Delete Icon"
                      />{" "}
                    </button>
                  </article>
                ))}
              </ProjectHolder>
            );
          })}
      </Card>
      {/* <LoginButton /> */}
    </Wrapper>
  );
};

export default StaffDashboard;

// export { Projects, add, pause, deleteTask };
