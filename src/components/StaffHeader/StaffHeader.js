import React, { useState } from "react";
import { Header, Aside } from "./StaffHeader.styles";
import logo from "../../Images/logo3.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { fetchStorageData } from "../../helper";
// import {MockUser} from '../../';
import LoginButton from "../Log/LoginButton";

const StaffHeader = ({ employee }) => {
  const history = useHistory();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const user = fetchStorageData({ key: "User" }) ?? employee;
  // const Profile= fetchStorageData({ key: "Profile" });

  const Lunch = () => {
    history.push("/staffBooking");
  };

  const Home = () => {
    history.push("/Dashboard");
  };

  const Reports = () => {
    history.push("/Reports");
  };

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <>
      <Header>
        <section className="logo" alt="SYNERGY Logo">
          <img src={logo} width="55vw" height="55vh" alt="SYNERGY Logo" />
          <h1>
            <a href="/">SYNERGY</a>
          </h1>
        </section>
        <nav className="links">
          <ul>
            <li>
              <a onClick={Home}>Home</a>
            </li>
            <li>
              <a onClick={Reports}>Reports</a>
            </li>
            <li>
              <a onClick={Lunch}>Bookings</a>
            </li>
          </ul>
        </nav>
        <nav className="icons">
          <button className="profile" onClick={toggleAside}>
            <UserIcon width={24} height={24} />
          </button>
          <LoginButton />
        </nav>

        {/* <ArrowRightIcon width={24} /> */}
      </Header>
      {isAsideOpen && (
        <Aside className="aside-menu">
          {/* <button onClick={toggleAside}>
            <XMarkIcon width={24} />
          </button> */}
          <nav>
            <ul>
              <img src={Profile.picture} />
              <li>{Profile.name}</li>
              <li>{Profile.email}</li>
              <li>{user.EMP_type}</li>
              {/* Add more items as needed */}
            </ul>
          </nav>
        </Aside>
      )}
    </>
  );
};

export default StaffHeader;
