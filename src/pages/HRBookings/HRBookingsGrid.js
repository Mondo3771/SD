import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Loader from "../../components/Loader/Loader";
const formatDate = (date) => {
  const temp = date.split("T")[0];
  return temp;
};

const fetchData = (setallBookings, setLoaded) => {
  fetch("/api/Bookings")
    .then((response) => response.json())
    .then((Bookings) => {
      // console.log(Bookings);
      const BookingsArr = Bookings.data.map((b, index) => {
        let temp = b;
        temp["Date_of_booking"] = temp["Date_of_booking"]
          ? formatDate(temp["Date_of_booking"])
          : "Null";
        return { ...temp, id: index + 1 };
      });
      setallBookings(BookingsArr);
      setLoaded(true);
    });
};

const HRBookingsGrid = () => {
  const [rowId, setrowId] = useState(null);
  0;
  const [allBookings, setallBookings] = useState(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData(setallBookings, setLoaded);
  }, []);

  //   const removeEmp = (id, Emp_ID) => {
  //     // need ID to remove employee
  //     // query to remove email with row
  //     const get = () =>
  //       fetch("/api/Bookings", {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           Emp_ID: Emp_ID,
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log("Success:", data.message);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     get();
  //     const updatedEmployees = allBookings.filter((emp) => emp.id !== id);
  //     setallBookings(updatedEmployees);
  //   };

  //   const updateEmp = (params) => {
  //     // update their type here
  //     //employee.emp_type = empType;
  //     fetch("/api/Bookings", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         Emp_ID: params.row.Emp_ID,
  //         EMP_type: params.row.EMP_type,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.message);
  //       });
  //   };

  const columns = [
    {
      field: "Booking_ID",
      headerName: "Booking_ID",
      headerClassName: "headername",
      flex: 1,
    },
    {
      field: "Emp_ID",
      headerName: "Emp_ID",
      headerClassName: "headername",
      flex: 1,
    },
    {
      field: "Meal_ID",
      headerName: "Meal_ID",
      flex: 1,
      headerClassName: "headername",
    },
    {
      field: "Date_of_booking",
      headerName: "Date of Booking",
      flex: 1,
      headerClassName: "headername",
    },

    // {
    //   field: "actions",
    //   headerName: "Save Changes",
    //   type: "actions",
    //   flex: 1,
    //   headerClassName: "headername",
    //   renderCell: (params) => (
    //     <button
    //       {...(params, rowId, setrowId)}
    //       style={{
    //         backgroundColor: "var(--white)",
    //         color: "var(--darkest)",
    //         border: "none",
    //         borderRadius: "30px",
    //         height: "6vh",
    //         width: "4vw",
    //         fontSize: "0.5rem",
    //         cursor: "pointer",
    //       }}
    //       onClick={() => updateEmp(params)}
    //     >
    //       <CheckCircleIcon width="3vw" height="4vh" />
    //     </button>
    //   ),
    // },
    // {
    //   field: "Remove",
    //   headerName: "Remove",
    //   type: "actions",
    //   flex: 1,
    //   headerClassName: "headername",

    //   renderCell: (params) => (
    //     <button
    //       {...(params, rowId, setrowId)}
    //       style={{
    //         backgroundColor: "var(--white)",
    //         color: "var(--darkest)",
    //         border: "none",
    //         borderRadius: "30px",
    //         height: "6vh",
    //         width: "4vw",
    //         fontSize: "0.5rem",
    //         cursor: "pointer",
    //       }}
    //       onClick={() => removeEmp(params.row.id, params.row.Emp_ID)}
    //     >
    //       <TrashIcon width="3vw" height="4vh" textAlign="center" />
    //     </button>
    //   ),
    // },
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
                color: "var(--white)",
              },
            }}
          >
            <DataGrid
              rows={allBookings}
              columns={columns}
              sx={{
                height: "80vh",
                width: "80vw",
                gap: 5,
                textAlign: "center",
                boxShadow: 2,
                borderRadius: "20px",
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
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default HRBookingsGrid;
export { fetchData, formatDate };
