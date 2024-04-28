// <<<<<<< LandingPageMakeover
// import React from "react";
// import HRdatagrid from "../../components/HRdatagrid/HRdatagrid";
// =======
import React from "react";
import HRAccess from "../../components/HRAccess/HRAccess";
// import HRdatagrid from "./components/HRdatagrid/HRdatagrid";
import HRdatagrid from "../../components/HRdatagrid/HRdatagrid";
import { Header, Wrapper, Card } from "./HRHome.styles";
import logo from "./Images/logo3.svg";

const HRHome = () => {
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
                <a href="#">Meals</a>
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
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <p>Hello</p>
          <HRdatagrid></HRdatagrid>
        </Card>
      </Wrapper>
    </>
  );
};

export default HRHome;
