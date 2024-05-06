import React from "react";
import logo from "../../Images/logo3.svg";
import { Card, Header, Wrapper } from "./HRBookings.styles";
import HRBookingsGrid from "./HRBookingsGrid";
const HRBookings = () => {
  return (
    <>
      <Wrapper>
        <Header>
          <section className="logo">
            <img src={logo} width="55vw" height="55vh"></img>
            <h1>
              <a href="/">SYNERGY</a>
            </h1>
          </section>
          <nav className="links">
            <ul>
              <li>
                <a href="#">Reports</a>
              </li>
              <li>
                <a href="HRMeals">Meals</a>
              </li>
              <li>
                <a href="#">Bookings</a>
              </li>
              <li>
                <a href="#">Car Wash</a>
              </li>
              <li>
                <a href="#">Users</a>
              </li>
            </ul>
          </nav>
        </Header>
        <section className="titlepage">
          <h2>Manage Users</h2>
        </section>
        <Card>
          <HRBookingsGrid></HRBookingsGrid>
        </Card>
      </Wrapper>
    </>
  );
};

export default HRBookings;
