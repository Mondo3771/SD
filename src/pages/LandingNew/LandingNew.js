// Importing necessary dependencies, images, and components
import logo from "../../Images/logo3.svg";
import tasks from "./Images/icon2.PNG";
import report from "./Images/reportingnew.PNG";
import manage from "./Images/icon3.PNG";
import book from "./Images/icon4.PNG";
import LoginButton from "../../components/Log/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Header,
  DropDown,
  Element,
  LandingPageBack,
  Features,
  About,
} from "./LandingNew.styles";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../components/Loader/Loader";
import { fetchStorageData, setLocalStorage } from "../../helper";

// The LandingNew component
const LandingNew = () => {
  // Using hooks and Auth0 for user authentication
  const history = useHistory();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [Loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  // Function to update the data and Loaded state using the child data
  const childToParent = (childdata) => {
    setData(childdata);
    setLoaded(true);
  };

  // If user is authenticated and Loaded is false, get an access token and call childToParent
  if (isAuthenticated && !Loaded) {
    const token = getAccessTokenSilently(
      {
        audience: "http://localhost3000/api/login",
        scope: "read:current_user",
      },
    );
    childToParent(user);
  }

  // Function to make a fetch request to an API endpoint
  const login = async () => {
    const token = await getAccessTokenSilently();
    fetch(`/api/login?Token=${data.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((DB) => {
        if (DB.message === "No user found") {
          // If no user found, make a POST request to create a new user
          const get = () =>
            fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Department: null,
                EMP_type: "Staff",
                Token: data.sub,
              }),
            })
              .then((response) => response.json())
              .then((DB) => {
                // Set local storage and navigate to a different route
                setLocalStorage({ key: "User", value: DB.data });
                setLoaded(true);
                history.push(`/DashBoard`, { params: DB.data });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          get();
        } else {
          // If user found, set local storage and navigate to a different route
          setLocalStorage({ key: "User", value: DB.data });
          if (DB.data.EMP_type === "HR") {
            history.push(`/HRhome`, { params: DB.data });
          } else {
            history.push(`/DashBoard`, { params: DB.data });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Call the login function whenever data changes
  useEffect(() => {
    if (data) {
      setLoading(true);
      login();
    }
  }, [data]);

  // Return a JSX structure that renders the landing page
  return (
    <LandingPageBack>
      <Header>
        <section className="heading">
          <img src={logo} width="55vw" height="55vh"></img>
          <h1> SYNERGY</h1>
        </section>

        <section className="description">
          <p
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Features
          </p>

          <p
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            About
          </p>
        </section>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isDropdownOpen && (
            <DropDown>
              {/* Dropdown for features */}
            </DropDown>
          )}
          {isAboutOpen && (
            <DropDown>
              {/* Dropdown for about section */}
            </DropDown>
          )}
          {isDropdownOpen || isAboutOpen ? (
            <section className="open">
              Connecting Teams, Boosting Productivity Together!
              <LoginButton alt="Log In" />
            </section>
          ) : (
            <section className="text">
              Connecting Teams, Boosting Productivity Together!
              <LoginButton alt="Log In" />
            </section>
          )}
        </>
      )}
    </LandingPageBack>
  );
};

// Exporting the LandingNew component
export default LandingNew;