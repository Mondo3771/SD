// Importing necessary dependencies, images, and components
import LoginButton from "../../components/Log/LoginButton";
import logo from "../../Images/logo3.svg";
import { Card, Header, Wrapper } from "./HRBookings.styles";
import HRBookingsGrid from "./HRBookingsGrid";
import React from "react";

// The HRBookings component
const HRBookings = () => {
  // The JSX that gets returned
  return (
    <Wrapper>
      <Header>
        <section className="logo">
          <img src={logo} width="55vw" height="55vh"></img> {/* The logo*/}
          <h1>
            <a href="/">SYNERGY</a> {/* The title*/}
          </h1>
        </section>
        <nav className="links">
          <ul>
            <li>
              <a href="HRMeals">Meals</a> {/* Link to the Meals page*/}
            </li>
            <li>
              <a href="HRBookings">Bookings</a> {/* Link to the Bookings page*/}
            </li>
            <li>
              <a href="HRhome">Users</a> {/* Link to the Users page */}
            </li>
            <li>
              {" "}
              <LoginButton className={"logout"} /> {/*The logout button */}
            </li>
          </ul>
        </nav>
      </Header>
      <section className="titlepage">
        <h2>Bookings</h2> {/*The title of the page */}
      </section>
      <Card>
        <HRBookingsGrid></HRBookingsGrid> {/* The HRBookingsGrid component*/}
      </Card>
    </Wrapper>
  );
};

// Exporting the HRBookings component
export default HRBookings;
