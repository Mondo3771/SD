import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Loader from "../../components/Loader/Loader";

const formatDate = (date) => {
  const temp = date.split("T")[0];
  return temp;
};

// const fetchData = (users, setallEmployeedatas, setLoadeds) =>
//   fetch("/api/AllEmployees")
//     .then((response) => response.json())
//     .then((employees) => {

//     })

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
const MockBookings = [
  {
    Booking_ID: 1,
    Emp_ID: 83,
    Meal_ID: 0,
    Date_of_Booking: "2015-09-09",
  },
];

const HRBookingsGrid = () => {
  const [rowId, setrowId] = useState(null);
  const [allBookings, setallBookings] = useState(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    // fetchData(setallBookings, setLoaded);
    const arr = MockBookings.map((booking, i) => ({
      ...booking,
      id: i + 1, // Assigning a unique id to each row
    }));
    setallBookings(arr);
    setLoaded(true);
  }, []);

  const columns = [
    {
      field: "Booking_ID",
      headerName: "Booking_ID",
      headerClassName: "headername first",
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
      headerClassName: "headername last",
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
                color: "var(--white)",
              },
              "& .first": {
                borderRadius: "20px 0 0 0",
              },
              "& .last": {
                borderRadius: " 0 20px 0 0",
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
