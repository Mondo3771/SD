import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// import { useLocation } from "react-router-dom/cjs/react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchStorageData } from "../../helper";
import { TrashIcon } from "@heroicons/react/24/outline";

const formatDate = (date) => {
  const temp = date.split("T")[0];
  return temp;
};

const removeBooking = (id, Booking_ID, setallBookings, allBookings) => {
  deleteBooking(Booking_ID);
  const updatedBookings = allBookings.filter((b) => b.id !== id);
 setallBookings(updatedBookings);
};
const deleteBooking = (Booking_ID) => {
  fetch("/api/Bookings", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Booking_ID: Booking_ID,
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

const fetchData = (setallBookings, setLoaded) => {
  fetch("/api/Bookings")
    .then((response) => response.json())
    .then((Bookings) => {
      const allUsers = fetchStorageData({key: "AllUsers"})
      const BookingsArr = Bookings.data.map((b, index) => {
        let temp = b;
        temp["Date_of_booking"] = temp["Date_of_booking"]
          ? formatDate(temp["Date_of_booking"])
          : "Null";


        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].Emp_ID == temp.Emp_ID){
            temp["Name"] = allUsers[i].Name;
            temp["Surname"] = allUsers[i].Surname;
            temp["EMP_type"] = allUsers[i].EMP_type;
          }
          
        } 
        
        const allMeals =  fetchStorageData({key: "Meals"})

        for (let i = 0; i < allMeals.length; i++) {
          if (allMeals[i].Meal_ID == temp.Meal_ID){
            temp["Meal"] = allMeals[i].Name_of_Meal;
          }
          
        } 

        // return 
        return { ...temp, id: index + 1 };
      });
      setallBookings(BookingsArr);
      setLoaded(true);
    });
};


const HRBookingsGrid = () => {
  const [rowId, setrowId] = useState(null);
  const [allBookings, setallBookings] = useState(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData(setallBookings, setLoaded);
  }, []);

  const columns = [
    {
      field: "Name",
      headerName: "Name",
      headerClassName: "headername first",
      flex: 1,
    },
    {
      field: "Surname",
      headerName: "Surname",
      headerClassName: "headername",
      flex: 1,
    },
    {
      field: "EMP_type",
      headerName: "Employee Type",
      headerClassName: "headername",
      flex: 1,
    },
    {
      field: "Meal",
      headerName: "Meal",
      flex: 1,
      headerClassName: "headername",
    },
    {
      field: "Date_of_booking",
      headerName: "Date of Booking",
      flex: 1,
      headerClassName: "headername",
    },
    { 
      field: "Remove",
      headerName: "Remove",
      type: "actions",
      flex: 1,
      // width: "16vh",
      headerClassName: "headername remove last",

      //renderCell: (params) => <AdminActions {...(params, rowId, setrowId)} />,
      renderCell: (params) => (
        <button
          {...(params, rowId, setrowId)}
          style={{
            backgroundColor: "transparent",
            color: "inherit",
            border: "none",
            borderRadius: "30px",
            //padding: "8px 16px",
            height: "6vh",
            width: "4vw",
            fontSize: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => removeBooking(
            params.row.id,
            params.row.Booking_ID,
            setallBookings,
            allBookings,
          )
          }
        >
          <TrashIcon width="2vw" height="3vh" textAlign="center"/>
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
