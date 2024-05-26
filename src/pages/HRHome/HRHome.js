// Importing necessary dependencies, images, and components
import React from "react";
import HRdatagrid from "../../components/HRdatagrid/HRdatagrid";
import { Header, Wrapper, Card } from "./HRHome.styles";
import logo from "../../Images/logo3.svg";
import LoginButton from "../../components/Log/LoginButton";
import { useEffect } from "react";
import { setLocalStorage } from "../../helper";

// Function to fetch meals data from the server and store it in local storage
const getMeals = () => {
  fetch("/api/CreateMeals") // Making a GET request to the '/api/CreateMeals' endpoint
    .then((response) => {
      return response.json(); // Parsing the response data as JSON
    })
    .then((data) => {
        setLocalStorage({key:"Meals",value:data.data}) // Storing the meals data in local storage
    })
    .catch((error) => {
      console.log(error); // Logging any errors
    });
};

// The HRHome component
const HRHome = () => {
  useEffect(() =>{ // Using the useEffect hook to call the getMeals function when the component mounts
    getMeals();
  },[])
 
  // The JSX that gets returned
  return (
      <Wrapper>
        <Header>
          <section className="logo">
            <img src={logo} width="55vw" height="55vh"></img> {/* The logo */}
            <h1>
              <a href="/">SYNERGY</a> {/* The title */}
            </h1>
          </section>
          <nav className="links">
            <ul>
              <li>
                <a href="HRMeals">Meals</a> {/* Link to the Meals page */}
              </li>
              <li>
                <a href="HRBookings">Bookings</a> {/* Link to the Bookings page */}
              </li>
              <li>
                <a href="HRhome">Users</a> {/* Link to the Users page */}
              </li>
              <li>
              {" "}
              <LoginButton className={"logout"} /> {/* The logout button */}
            </li>
            </ul>
          </nav>
        </Header>
          <HRdatagrid data-test-ID="HRdataGRid" ></HRdatagrid> {/* The HRdatagrid component */}
        {/* <LoginButton /> */}
      </Wrapper>
  
  );
};

// Exporting the HRHome component
export default HRHome;