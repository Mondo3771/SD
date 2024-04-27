import React, { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

import { Spinner } from "./HRdatagrid.styles";
import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  StopIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const HRdatagrid = () => {
  const [rowId, setrowId] = useState(null);
  // const location = useLocation();

  // const user = location.state.params;

  const rows = [
    {
      NaName: "John",
      Surname: "Doe",
      email: "john.doe@gmail.com",
      emp_type: "Staff",
      id: 1,
    },
    {
      name: "Jenny",
      surname: "Doe",
      email: "jenny.doe@gmail.com",
      emp_type: "Staff",
      id: 2,
    },
    {
      name: "Emily",
      surname: "Doe",
      email: "emily.doe@gmail.com",
      emp_type: "Staff",
      id: 3,
    },
    {
      name: "Adam",
      surname: "Smith",
      email: "adam.smith@gmail.com",
      emp_type: "Staff",
      id: 4,
    },
    {
      name: "Sarah",
      surname: "Jones",
      email: "sarah.jones@gmail.com",
      emp_type: "Staff",
      id: 5,
    },
    {
      name: "Michael",
      surname: "Brown",
      email: "michael.brown@gmail.com",
      emp_type: "Staff",
      id: 6,
    },
    {
      name: "Jessica",
      surname: "Wilson",
      email: "jessica.wilson@gmail.com",
      emp_type: "Staff",
      id: 7,
    },
    {
      name: "David",
      surname: "Martinez",
      email: "david.martinez@gmail.com",
      emp_type: "Staff",
      id: 8,
    },
    {
      name: "Emma",
      surname: "Garcia",
      email: "emma.garcia@gmail.com",
      emp_type: "Staff",
      id: 9,
    },
    {
      name: "Matthew",
      surname: "Lopez",
      email: "matthew.lopez@gmail.com",
      emp_type: "Staff",
      id: 10,
    },
  ];

  const [allEmployeedata, setallEmployeedata] = useState(null);
  const [Loaded, setLoaded] = useState(true);

  // useEffect(() => {
  //   const fetchData = () => {
  //     fetch("/api/AllEmployees")
  //       .then((response) => response.json())
  //       .then((employees) => {
  //         // setallEmployeedata(employees.data);

  //         const employeesWithId = employees.data
  //           .filter((employee) => employee.Emp_ID !== user.Emp_ID)
  //           .map((employee, index) => ({
  //             ...employee,
  //             id: index + 1, // Assigning a unique id to each row
  //           }));
  //         setallEmployeedata(employeesWithId);

  //         setLoaded(true);
  //       });
  //   };
  //   fetchData();
  // }, []);

  const removeEmp = (id, Emp_ID) => {
    // need ID to remove employee
    // query to remove email with row
    // const get = () =>
    //   fetch("/api/AllEmployees", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       Emp_ID: Emp_ID,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data.message);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // get();
    // const updatedEmployees = allEmployeedata.filter((emp) => emp.id !== id);
    // setallEmployeedata(updatedEmployees);
  };

  const updateEmp = (params) => {
    // update their type here
    //employee.emp_type = empType;
    // fetch("/api/AllEmployees", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Emp_ID: params.row.Emp_ID,
    //     EMP_type: params.row.EMP_type,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //deal woth response
    //     // setupdate(empType);
    //     // settext("Success ");
    //     console.log(data.message);
    //     // employee.EMP_type = empType;
    //   });
  };

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
          onClick={() => removeEmp(params.row.id, params.row.Emp_ID)}
        >
          <TrashIcon width="3vw" height="4vh" textAlign="center" />
        </button>
      ),
    },
  ];

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
              rows={rows}
              columns={columns}
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
                //borderColor: "red",
                // background: "var(--white)",
                //background: "transparent",
                background:
                  "linerar-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              }}
            />
          </Box>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default HRdatagrid;
