//react
import React, { useState } from "react";

//icons
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// StaffDashboard styles
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
  // const data = location.state.params; // Remove this line

  const Emp_ID = 1;
  const [Loaded, setLoaded] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  const [uniqueProjectNames, setUniqueProjectNames] = useState([]);
  const [Sheets, setSheets] = useState([]);
  // console.log(AllProjects);
  // console.log(uniqueProjectNames);

  useEffect(() => {
    setAllProjects([...allProjects]);
    let sheets = [];

    //filter Allprojects and add objects (number of projects ) to the sheets array
    const uniques = filterUniqueProjects(allProjects);
    setUniqueProjectNames(uniques);

    // for (let i = 0; i < uniques.length; i++) {
    //   let u = {
    //     Project: uniques[i],
    //     Tasks: [],
    //   };
    //   sheets.push(u);
    // }
    const pjs = []
    for (let p in allProjects) {
      let x = {
        Task_ID: allProjects[p].Task_ID,
        Project: allProjects[p].Project,
        Date: allProjects[p].Date,
        Description: allProjects[p].Description,
        Time: allProjects[p].Time,
        Emp_ID: allProjects[p].Emp_ID,
        Active: allProjects[p].Active,
        Component: (
          <TaskContainer
            task={{
              Task_ID: allProjects[p].Task_ID,
              Project: allProjects[p].Project,
              Date: allProjects[p].Date,
              Description: allProjects[p].Description,
              Time: allProjects[p].Time,
              Emp_ID: allProjects[p].Emp_ID,
              Active: allProjects[p].Active,
            }}
            onDelete={handleDelete}
            onPause= {handlePause}
            onStop={handleStop}
            key={allProjects[p].Task_ID}
            allProjects={allProjects}
          />
        ),
      };
      pjs.push(x)
    }
    setAllProjects(pjs)

      // let element = (
      //   <TaskContainer
      //     key={allProjects[p].Task_ID}
      //     task={x}
      //     // Sheets={sheets}
      //     allProjects={allProjects}
      //     onDelete={handleDelete}
      //     onPause={handlePause}
      //     onStop={handleStop}
      //   />
      // );

    //   for (let i = 0; i < sheets.length; i++) {
    //     if (sheets[i].Project === allProjects[p].Project) {
    //       sheets[i].Tasks = [...sheets[i].Tasks, element];
    //     }
    //   }
    // }
    // setSheets(sheets);
    setLoaded(true);

    // const Projects = () => {
    //   fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //       setAllProjects(data);
    //       setLoaded(true);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // };
    // Projects();
  }, []);

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
    // add();
    taskToAdd["Task_ID"] = Emp_ID;

    // const updatedSheets = [...Sheets];
    // const sheetIndex = Sheets.findIndex(
    //   (item) => item.Project === taskToAdd.Project
    // );
    // const sheetToUpdate = updatedSheets[sheetIndex];

    const sheetToAdd = (
      <TaskContainer
        key={taskToAdd.Task_ID}
        task={taskToAdd}
        // Sheets={Sheets}
        allProjects={AllProjects}
        onDelete={handleDelete}
        onPause={handlePause}
        onStop={handleStop}
      />
    );

    const temp = taskToAdd;
    temp["Component"] = sheetToAdd
    setAllProjects((prev) => [temp,...prev])

    // sheetToUpdate.Tasks = [sheetToAdd, ...sheetToUpdate.Tasks];

    // updatedSheets[sheetIndex] = sheetToUpdate;

    // setAllProjects(a => a.filter( p => p.Task_ID !== taskToDelete.Task_ID))

    // setSheets(prevSheets => {
    //   return prevSheets.map((Project) => {
    //     if (Project.Project === taskToAdd.Project){
    //       return {
    //         ...sheet,
    //         Tasks: [...sheet.Tasks,sheetToAdd]
    //       };
    //     }
    //     return sheet;

    //   })
    // });

    // setAllProjects((prevTasks) => [...prevTasks, taskToAdd]);

    // console.log(AllProjects)
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
    // pause();
  };
  const handleStop = (taskToStop) => {
    console.log(taskToStop);
    // in here we pass a task_id and
    //cahnge true to false ,,,, ACtive
    // fetch(`/api/Tasks/?task_ID=${taskToStop.Task_ID}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ done: true }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };
  const handleDelete = (taskToDelete, sheets, allProjects) => {
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

    const updatedSheets = [...sheets];
    const sheetIndex = sheets.findIndex(
      (item) => item.Project === taskToDelete.Project
    );
    const sheetToUpdate = updatedSheets[sheetIndex];

    sheetToUpdate.Tasks = sheetToUpdate.Tasks.filter(
      (item) => item.key != taskToDelete.Task_ID
    );

    updatedSheets[sheetIndex] = sheetToUpdate;

    console.log(Sheets);
    setAllProjects((a) => a.filter((p) => p.Task_ID !== taskToDelete.Task_ID));

    setSheets(updatedSheets);
    setUniqueProjectNames(
      filterUniqueProjects(
        allProjects.filter((p) => p.Task_ID !== taskToDelete.Task_ID)
      )
    );
    // console.log(allProjects)
  };

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
          uniqueProjectNames.map((name, index) => {
            return (
              <ProjectHolder key={index}>
                <h2>{name}</h2>

                {filterTasksByProject(AllProjects, name).map((s) => s.Component)}
              </ProjectHolder>
            );
          })}
      </Card>
    </Wrapper>
  );
};

export default StaffDashboard;
