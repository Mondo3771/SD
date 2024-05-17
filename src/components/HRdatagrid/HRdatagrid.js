import React, { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  StopIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { type } from "@testing-library/user-event/dist/type";
import Reporting from "../Reporting/Reporting";

const removeEmp = (id, Emp_ID, setallEmployeedata, allEmployeedata) => {
  DELETEEmp(Emp_ID);
  const updatedEmployees = allEmployeedata.filter((emp) => emp.id !== id);
  setallEmployeedata(updatedEmployees);
};

const updateEmp = (params) =>{
  fetch("/api/AllEmployees", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Emp_ID: params.row.Emp_ID,
      EMP_type: params.row.EMP_type,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.message);
      return "Success";
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error";
    });
    const updateDep = () =>{
  fetch(`/api/AllEmployees`, {
    method:"Put", 
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Emp_ID: params.row.Emp_ID,
      Department: params.row.Department
    })
  }).then((res) => res.json()).then((data) =>{
  console.log(data);}
  ).catch((err)=> console.log(err))
} 
updateDep();

}


const fetchData = (users, setallEmployeedatas, setLoadeds) =>
  fetch("/api/AllEmployees")
    .then((response) => response.json())
    .then((employees) => {
      const employeesWithId = employees.data
        .filter((employee) => employee.Emp_ID !== users.Emp_ID)
        .map((employee, index) => ({
          ...employee,
          id: index + 1, // Assigning a unique id to each row
        }));
      setallEmployeedatas(employeesWithId);
      setLoadeds(true);
    });
const DELETEEmp = (Emp_ID) => {
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
      return "Success";
    })
    .catch((error) => {
      // console.log(error);
      return "Error";
    });
};

const HRdatagrid = () => {
  const [rowId, setrowId] = useState(null);
  const [OpenReport,setOpenReport]=useState(false);
  const [userReportpageinfo,setuserReportpageinfo]=useState(null);
  const location = useLocation();

  console.log(location, "location");
  let user = null;
  if (!location.state) {
    user = { Emp_ID: 1 };
  } else {
    user = location.state.params;
  }
  const [allEmployeedata, setallEmployeedata] = useState(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData(user, setallEmployeedata, setLoaded);
  }, []);


  const userReport=(user)=>{
    setOpenReport(true)
    setuserReportpageinfo(user);


  }

  const columns = [
    {
      field: "Name",
      headerName: "Name",
      headerClassName: "headername",
      //width: "16vh",
      //headerAlign: 'center',
      flex: 1,
    },
    {
      field: "Surname",
      headerName: "Surname",
      //width: "16vh",
      headerClassName: "headername",
      flex: 1,
    },
    {
      field: "EMP_type",
      headerName: "Employee Type",
      flex: 1,
      //width: "16vh",
      type: "singleSelect",
      valueOptions: ["Staff", "Manager", "HR"],
      editable: true,
      headerClassName: "headername",
    },
    {
      field:"Department",
      headerName:" Department",
      flex:1,
      editable: true,
      headerClassName: "headername",

    },
    {
      field:"Reports",
      headerName:" Report",
      type:"actions",
      flex:1,
      headerClassName: "headername",
      renderCell: (params) => (
        <button
          {...(params, rowId, setrowId)}
          style={{
            backgroundColor: "var(--white)",
            color: "var(--darkest)",
            border: "none",
            borderRadius: "30px",
            //padding: "8px 16px",
            height: "6vh",
            width: "4vw",
            fontSize: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() =>
            userReport(params.row)
          }
        >
          <TrashIcon width="3vw" height="4vh" textAlign="center" />
        </button>
      )

    },
    

    {
      field: "actions",
      headerName: "Save Changes",
      type: "actions",
      flex: 1,
      //width: "16vh",
      headerClassName: "headername",
      //renderCell: (params) => <AdminActions {...(params, rowId, setrowId)} />,
      renderCell: (params) => (
        <button
          {...(params, rowId, setrowId)}
          style={{
            backgroundColor: "var(--white)",
            color: "var(--darkest)",
            border: "none",
            borderRadius: "30px",
            //padding: "8px 16px",
            height: "6vh",
            width: "4vw",
            fontSize: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => updateEmp(params)}
        >
          <CheckCircleIcon width="3vw" height="4vh" />
        </button>
      ),
    },
    {
      field: "Remove",
      headerName: "Remove",
      type: "actions",
      flex: 1,
      // width: "16vh",
      headerClassName: "headername",

      //renderCell: (params) => <AdminActions {...(params, rowId, setrowId)} />,
      renderCell: (params) => (
        <button
          {...(params, rowId, setrowId)}
          style={{
            backgroundColor: "var(--white)",
            color: "var(--darkest)",
            border: "none",
            borderRadius: "30px",
            //padding: "8px 16px",
            height: "6vh",
            width: "4vw",
            fontSize: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() =>
            removeEmp(
              params.row.id,
              params.row.Emp_ID,
              setallEmployeedata,
              allEmployeedata
            )
          }
        >
          <TrashIcon width="3vw" height="4vh" textAlign="center" />
        </button>
      ),
    },
  ];
  // const [data, setData] = useState(allEmployeedata);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    // Update the row data with the new value
    const updatedRows = allEmployeedata.map(row => (row.id === oldRow.id ? newRow : row));
    setallEmployeedata(updatedRows);
    return newRow;
  };

  return (
    <>
      {Loaded ? (
        <>
          {/* <Typography variant="h3" align="center" gutterBottom="false">
            Manage Users
          </Typography> */}

          <Box
            sx={{
              height: "80vh",
              width: "90vw",
              padding: 0,
              borderRadius: "0",
              color: "var(--white)",
              "& .headername": {
                backgroundColor: "var(--dark)",
                //background: "transparent",
                // borderTopLeftRadius: "20px",
                // borderTopRightRadius: "20px",
                color: "var(--white)",
                //backgroundColor: "linear-gradient(120deg, transparent, white)",
              },
            }}
          >
            <DataGrid
              rows={allEmployeedata}
              columns={columns}
              processRowUpdate={handleProcessRowUpdate}
              sx={{
                height: "80vh",
                width: "80vw",
                gap: 5,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: "20px",
                //border: 2,
                color: "var(--white)",
                fontSize: "1.1rem",

                background:
                  "linerar-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              }}
            />
          </Box>
          {OpenReport?<Reporting User={userReportpageinfo}></Reporting>:null}
          
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default HRdatagrid;

export { DELETEEmp, updateEmp, fetchData, removeEmp };
