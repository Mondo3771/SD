import React, { useState, useEffect } from "react";
import { EmployeeCard, AllEmployees, Spinner } from "./HRAccess.styles";

const Emp = ({ employee, index, removeEmp, empType, setEmpType }) => {
  const typeChange = (event) => {
    setEmpType(event.target.value, index); // Pass the index along with the new value
  };
  const [text, settext] = useState("Select Employee Type:"); //error
  const [update, setupdate] = useState(employee.EMP_type);

  const updateEmp = () => {
    if (!empType) {
      settext("Enter a Type");
    } else if (empType === employee.EMP_type) {
      settext("They are already under " + employee.EMP_type);
    } else {
      //update their type here
      // employee.emp_type=empType
      fetch("/api/AllEmployees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Emp_ID: employee.Emp_ID,
          EMP_type: empType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //deal woth response
          setupdate(empType);
          settext("Success ");
          console.log(data.message);
          employee.EMP_type = empType;
        });
    }
  };

  return (
    <EmployeeCard>
      <p>Name: {employee.Name}</p>
      <p>Surname: {employee.Surname}</p>
      <p>Email: {employee.Email}</p>
      <p>Employee Type: {employee.EMP_type}</p>
      <label htmlFor={`employeeType-${index}`}>{text}</label>
      <select
        id={`employeeType-${index}`}
        value={empType}
        onChange={typeChange}
      >
        <option value=""></option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Staff">Staff</option>
      </select>
      <button onClick={updateEmp}>Change type</button>
      <button onClick={() => removeEmp(employee.email, index, employee.Emp_ID)}>
        Remove
      </button>
    </EmployeeCard>
  );
};

const HRAccess = () => {
  const [empClicked, setempCLicked] = useState(true);
  const [allEmployeedata, setallEmployeedata] = useState(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/AllEmployees")
        .then((response) => response.json())
        .then((employees) => {
          setallEmployeedata(employees.data);

          setLoaded(true);
        });
    };
    fetchData();
  }, []);

  const displayEmp = () => {
    //button for displaying employees
    // setempCLicked((prev) => !prev);
  };

  const removeEmp = (email, index, Emp_ID) => {
    //need ID to remove employee
    //query to remove email with row
    const get = () =>
      fetch("/api/AllEmployees", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Emp_ID: Emp_ID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.message);
        })
        .catch((error) => {
          console.log(error);
        });

    get();
    setallEmployeedata((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  const [empType, setEmpType] = useState({});

  const setEmpTypeAtIndex = (type, index) => {
    setEmpType((prev) => {
      const updatedTypes = { ...prev };
      updatedTypes[index] = type; // Set the new type for the specified index
      return updatedTypes;
    });
  };

  return (
    <>
      {Loaded ? (
        <AllEmployees>
          <h2>Employee List</h2>
          <section>
            {allEmployeedata.map((employee, index) => (
              <Emp
                key={index}
                employee={employee}
                index={index}
                removeEmp={removeEmp}
                empType={empType[index] || ""}
                setEmpType={setEmpTypeAtIndex}
              />
            ))}
          </section>
        </AllEmployees>
      ) : (
        <p>Employees Loading</p>
      )}
    </>
  );
};

export default HRAccess;
