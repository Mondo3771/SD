import LoginButton from "../../components/Log/LoginButton";
import logo from "../../Images/logo3.svg";
import { Card, Header, Wrapper } from "./HRBookings.styles";
import HRBookingsGrid from "./HRBookingsGrid";
import React from "react";

const HRBookings = () => {
  return (
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
                <a href="HRMeals">Meals</a>
              </li>
              <li>
                <a href="HRBookings">Bookings</a>
              </li>
              
              <li>
                <a href="HRhome">Users</a>
              </li>
              <li>
              {" "}
              <LoginButton className={"logout"} />
            </li>
            </ul>
          </nav>
        </Header>
        <section className="titlepage">
          <h2>Bookings</h2>
        </section>
        <Card>
          <HRBookingsGrid></HRBookingsGrid>
        </Card>
      </Wrapper>
  );
};

export default HRBookings;
