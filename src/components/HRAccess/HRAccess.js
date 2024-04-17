import React, { useState, useEffect } from "react";
import {
  EmployeeCard,
  AllEmployees,
  Spinner,
} from "./HRAccess.styles";
const employees = [
  {
    name: "John",
    surname: "Doe",
    email: "john.doe@gmail.com",
    emp_type: "Staff",
    Emp_ID: 1
  },
  {
    name: "Jane",
    surname: "Smith",
    email: "jane.smith@gmail.com",
    emp_type: "Manager",
    Emp_ID: 2
  },
  {
    name: "Alice",
    surname: "Johnson",
    email: "alice.johnson@gmail.com",
    emp_type: "HR",
    Emp_ID: 3
  },
  {
    name: "Michael",
    surname: "Williams",
    email: "michael.williams@gmail.com",
    emp_type: "Staff",
    Emp_ID: 4
  },
  {
    name: "Emily",
    surname: "Brown",
    email: "emily.brown@gmail.com",
    emp_type: "Manager",
    Emp_ID: 5
  },
  {
    name: "Daniel",
    surname: "Jones",
    email: "daniel.jones@gmail.com",
    emp_type: "HR",
    Emp_ID: 6
  },
  {
    name: "Olivia",
    surname: "Taylor",
    email: "olivia.taylor@gmail.com",
    emp_type: "Staff",
    Emp_ID: 7
  },
  {
    name: "William",
    surname: "Davis",
    email: "william.davis@gmail.com",
    emp_type: "Manager",
    Emp_ID: 8
  },
  {
    name: "Sophia",
    surname: "Miller",
    email: "sophia.miller@gmail.com",
    emp_type: "HR",
    Emp_ID: 9
  },
  {
    name: "Matthew",
    surname: "Wilson",
    email: "matthew.wilson@gmail.com",
    emp_type: "Staff",
    Emp_ID: 10
  },
  {
    name: "Ethan",
    surname: "Moore",
    email: "ethan.moore@gmail.com",
    emp_type: "Manager",
    Emp_ID: 11
  },
  {
    name: "Ava",
    surname: "Anderson",
    email: "ava.anderson@gmail.com",
    emp_type: "HR",
    Emp_ID: 12
  },
  {
    name: "David",
    surname: "Thomas",
    email: "david.thomas@gmail.com",
    emp_type: "Staff",
    Emp_ID: 13
  },
  {
    name: "Madison",
    surname: "Jackson",
    email: "madison.jackson@gmail.com",
    emp_type: "Manager",
    Emp_ID: 14
  },
  {
    name: "Liam",
    surname: "White",
    email: "liam.white@gmail.com",
    emp_type: "HR",
    Emp_ID: 15
  },
  {
    name: "Mia",
    surname: "Harris",
    email: "mia.harris@gmail.com",
    emp_type: "Staff",
    Emp_ID: 16
  },
];


const Emp = ({ employee, index, removeEmp, empType, setEmpType }) => {
  const typeChange = (event) => {
    setEmpType(event.target.value, index); // Pass the index along with the new value
  };
  const [text, settext] = useState("Select Employee Type:"); //error
  const [update, setupdate] = useState(employee.Emp_type);

  const updateEmp = () => {
    console.log(employee.EMP_type);
    if (!empType) {
      settext("Enter a Type");
    } else if (empType === employee.EMP_type) {
      settext("They are already under " + employee.EMP_type);
    } else {
      //update their type here
      // employee.emp_type=empType
      fetch("/api/HR_Employees", {
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
          console.log(data);
          setupdate(empType);
          settext("Success ");
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
      <button onClick={() => removeEmp(employee.email, index, employee.Emp_ID)}>Remove</button>
    </EmployeeCard>
  );
};

const HRAccess = () => {
  const [empClicked, setempCLicked] = useState(true);
  const [allEmployeedata, setallEmployeedata] = useState(null);
  const [Loaded,setLoaded]=useState(true);//change back to false

  useEffect(() => {


    const fetchData = () => {
      fetch("/api/HR_Employees")
        .then((response) => response.json())
        .then((employees) => {
          console.log(employees);
          setallEmployeedata(employees);
          setLoaded(true);
        });
    };
    fetchData();
    console.log(allEmployeedata);
  }, []);

  const displayEmp = () => {
    //button for displaying employees
    // setempCLicked((prev) => !prev);
  };

  const removeEmp = (email,index, Emp_ID) => {
    //need ID to remove employee
    //query to remove email with row
    const get = () =>
      fetch("/api/HR_Employees", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Emp_ID": Emp_ID,
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
            {employees.map((employee, index) => (
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
      ) : <p>Employees Loading</p>}
    </>
  );
};

export default HRAccess;
