import React, { useEffect, useState } from "react";
import Index from "../../routes/Index";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// const Employee_meal = () => {
//   fetch(`/api/Meals?Emp_ID=${Emp_ID}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Do something with your data
//       // this returns an array of meals
//     });
// };

const DeleteBooking = (Booking_ID) => {
  fetch(`/api/CreateMeals/${Booking_ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Booking_ID }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Do something with your data
    });
};

export const PostBooking = (Emp_ID, Meal_ID) => {
  fetch(`/api/CreateMeals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Emp_ID: Emp_ID, Meal_ID: Meal_ID }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Do something with your data
    });
};
