import { redirect } from "react-router";
import { fetchData, setData } from "./helpers";

//This is where database functions for deleting and updationg must come

const StaffDashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  
  if (_action === "deleteTask") {
    const projects = (await fetchData("Projects")) ?? [];
    let index = 0;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].taskID === values.taskID) {
        index = i;
      }
    }
    let newArray = [...projects];
    newArray.splice(index,1)
    setData("Projects",newArray)
  }

  return null;
};

export default StaffDashboardAction;
