//react
import React, { useState ,useEffect } from "react";

// react router dom
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// helpers
import { fetchStorageData} from "../../helper";

//icons
import {
  ClockIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

// styles
import {
  Card,
  CreateTaskContainer,
  LabelHolder,
  ProjectHolder,
  TaskContainer,
  Wrapper,
} from "./StaffDashBoard.styles";

// components
import StaffHeader from "../../components/StaffHeader/StaffHeader";

// toast
import { toast } from "react-toastify";



// Function to filter and return the unique projects from an array of tasks  
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

// Function to filter and return tasks in a given projects
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

  // useHistory is to help with navigating between pages
  const history = useHistory();
  // Fetch the current users information from local storage
  const data = fetchStorageData({ key: "User" });
  // Storing the currenc  users Emp_ID in a const variable 
  const Emp_ID = data.Emp_ID;

  // Initializing the variables to render components on the pages
  const [Loaded, setLoaded] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  const [uniqueProjectNames, setUniqueProjectNames] = useState([]);

  // Initializing the variables for new projects/task to be added later
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [createTask, setCreate] = useState(false);

  // UseEffect will be called once at the start of the rendering of the page
  useEffect(() => {
    //replace allprojects with data from fetch

    // Projects function is a fetch that will get allprojects and tasks the current user has done
    const Projects = () => {
      fetch(`/api/Tasks/?Emp_ID=${Emp_ID}`)
        .then((response) => response.json())
        .then((data) => {
          let projects = data.data.sort((a,b) => {
            return new Date(a.Date)- new Date(b.Date)
          })

          const uniques = filterUniqueProjects(projects);
          // Fill the state variables with results from the the fetch
          setUniqueProjectNames(uniques);
          setAllProjects(projects);
          // Changing the Loaded variable to true will allow the components to be rendered only after the fetching and
          // processing is complete
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    Projects();
  }, []);


  // Give a boolean value return its not value
  // Called when the button create a new task is clicked or when the task is finished
  const handleClick = (prev) => !prev;

  // This function is called takes in a new task and does a POST to the database to addd it
  // It also adds the task or the front end 
  // Before adding the task, we must determine if the task is from a new project or not
  // If it is from a new project add that project and its task to the front of the 
  // setUniqueProjectNames and allprojects arrays. Otherwise add the task to the front of its own project 
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
    // close create ne task section
    setCreate(handleClick);
  };

  // when the input field for the project is changed, change the project name variable with this change
  const projectNameChange = (event) => {
    setName(event.target.value);
  };

  // when the input field for the task is changed, change the task name variable with this change
  const taskChange = (event) => {
    setTask(event.target.value);
  };

  // When the pause button is clicked, we do a PUT request to add the time at pause to the database for that task
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

  // When the stop button is clicked, we do a PUT request to change the active status of the task to the database
  const handleStop = (taskToStop) => {
  
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

  // This fucntion deletes a task from the database given its Message_ID
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

  // This function calls the deleteTask() function and does the necessary front-end adjustments
  // i.e deleting the message and re-rendering, deleting projects
  const handleDelete = (taskToDelete) => {
    // pass task id to delete
    deleteTask(taskToDelete);
    setAllProjects((a) => a.filter((p) => p.Task_ID !== taskToDelete.Task_ID));
    setUniqueProjectNames(
      filterUniqueProjects(
        AllProjects.filter((p) => p.Task_ID !== taskToDelete.Task_ID)
      )
    );
  };

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
    </Wrapper>
  );
};

export default StaffDashboard;


